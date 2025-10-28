# Telehome CRM Dizaynı, Verilənlər Bazası və API Xəritəsi

## UI və UX Dizaynı

### Layout
- **Sol menyu**: Collapsible sidebar, desktopda `w-64`, sıxlaşdırılmış kontent boşluğu, mobil/tabletdə off-canvas menyu. Telehome loqosu menyu kiçildikdə yalnız "T" ikonunu saxlayır.
- **Əsas kontent**: Maksimum genişlik `1280px`, 6px/24px arası responsiv boşluqlar, dark-theme (Slate 950) və şüşə effektli kartlar.
- **Statistika zonası**: 4 əsas metrik kartı (Toplam lead, Aktiv lead, Bugünkü lead, Konversiya). Trend indikatorları və status ikonları var.
- **Filtr paneli**: Axtarış (real-time), status, məhsul, satış nümayəndəsi və tarix aralığı filtrleri. Mobil üçün grid stack.
- **Müştəri bölməsi**: Lead cədvəli + sağda lead profil paneli. Bulk əməliyyat paneli (status dəyiş, nümayəndə təyin et).
- **Inteqrasiya və əlavə bölmələr**: Satış komandası kartları, WhatsApp inteqrasiya məlumatı, icazə rolları, məhsul kataloqu, analitika, Performance & UX, SEO & Hosting.
- **Adaptiv dizayn**: Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) ilə qismən grid dəyişimi, mobil üçün menyu açma düyməsi, komponentlərdə 100% genişlik.

### Interaction
- Lead seçimləri (checkbox) bulk əməliyyat üçün.
- Lead sırasına klikləmə ilə sağdakı profil paneli yenilənir.
- WhatsApp düyməsi `wa.me` linki ilə birbaşa əlaqə yaradır.
- Filtrlər state idarəsi ilə real-time cədvəl filtrini işə salır.
- AI Assistant və Live Monitoring üçün placeholder butonlar, gələcək inteqrasiya üçün yer.

## Verilənlər Bazası Strukturu

### Əsas Cədvəllər
- **users**
  - `id` (UUID, PK)
  - `role` (`admin` | `sales`)
  - `full_name`
  - `email`
  - `phone`
  - `avatar_url`
  - `created_at`
  - `updated_at`

- **leads**
  - `id` (UUID, PK)
  - `full_name`
  - `phone`
  - `email`
  - `status` (`new`, `in_discussion`, `pending`, `won`, `lost`)
  - `desired_product_id` (FK → products.id)
  - `assigned_to` (FK → users.id)
  - `source` (`facebook`, `instagram`, `referral`, `web_form`, ...)
  - `last_active_at`
  - `created_at`
  - `updated_at`

- **lead_messages**
  - `id` (UUID, PK)
  - `lead_id` (FK → leads.id)
  - `author_type` (`agent`, `customer`, `system`)
  - `author_id` (FK → users.id, nullable)
  - `content`
  - `media_url` (nullable)
  - `detected_product_id` (FK → products.id, nullable)
  - `ai_summary`
  - `created_at`

- **lead_interests**
  - `lead_id` (FK → leads.id)
  - `product_id` (FK → products.id)
  - PK `(lead_id, product_id)`

- **quotes**
  - `id` (UUID, PK)
  - `lead_id` (FK → leads.id)
  - `amount`
  - `currency`
  - `terms`
  - `expires_at`
  - `created_by` (FK → users.id)
  - `created_at`

- **orders**
  - `id` (UUID, PK)
  - `lead_id` (FK → leads.id)
  - `product_id` (FK → products.id)
  - `status` (`pending_confirmation`, `shipped`, `completed`, `cancelled`)
  - `total_amount`
  - `currency`
  - `created_at`
  - `updated_at`

- **products**
  - `id` (UUID, PK)
  - `name`
  - `sku`
  - `price`
  - `currency`
  - `stock`
  - `is_active`
  - `created_at`
  - `updated_at`

- **campaigns**
  - `id` (UUID, PK)
  - `name`
  - `channel`
  - `budget`
  - `start_date`
  - `end_date`
  - `utm_source`
  - `utm_medium`

- **lead_sources**
  - `lead_id` (FK → leads.id)
  - `campaign_id` (FK → campaigns.id)
  - `channel`
  - `metadata` (JSONB)

- **attachments**
  - `id` (UUID, PK)
  - `lead_id` (FK → leads.id)
  - `message_id` (FK → lead_messages.id)
  - `file_url`
  - `file_type`
  - `ai_detected_product`
  - `created_at`

- **audits**
  - `id` (UUID, PK)
  - `entity_type`
  - `entity_id`
  - `action`
  - `performed_by` (FK → users.id)
  - `payload` (JSONB)
  - `created_at`

### Rol və İcazə Cədvəlləri
- **roles**: `id`, `name`, `description`
- **role_permissions**: `role_id`, `permission_key`
- **user_roles**: `user_id`, `role_id`

## API Xəritəsi

### Auth & Users
- `POST /api/auth/login` — JWT ilə giriş.
- `POST /api/auth/refresh` — token yenilənməsi.
- `GET /api/users/me` — istifadəçi profili və icazələr.
- `GET /api/users` — (admin) satışçı siyahısı.
- `PATCH /api/users/:id` — rol və aktivlik dəyişiklikləri.

### Leads
- `GET /api/leads` — filtr parametrləri: `status`, `assigned_to`, `product_id`, `date_from`, `date_to`, `search`.
- `POST /api/leads` — yeni lead yaradılması.
- `GET /api/leads/:id` — lead profil məlumatları.
- `PATCH /api/leads/:id` — status, təyin edilən satışçı və qeydlər.
- `POST /api/leads/:id/assign` — bulk və ya fərdi təyinat.
- `POST /api/leads/:id/messages` — WhatsApp/CRM mesajlarının əlavə olunması.
- `GET /api/leads/:id/messages` — mesaj tarixçəsi.
- `POST /api/leads/bulk-update` — status və nümayəndə bulk dəyişiklik.

### Quotes & Orders
- `POST /api/leads/:id/quotes` — AI təklif generatorundan istifadə etməklə təklif.
- `GET /api/quotes/:id` — təklif detallar.
- `POST /api/leads/:id/orders` — lead-dən sifariş yaratmaq.
- `PATCH /api/orders/:id` — sifariş statuslarının idarəsi.
- `GET /api/orders` — filtr: `status`, `product_id`, `assigned_to`.

### Products & Catalog
- `GET /api/products` — aktiv məhsul kataloqu.
- `POST /api/products` — (admin) yeni məhsul.
- `PATCH /api/products/:id` — stok, qiymət yenilənməsi.
- `GET /api/products/:id/demand` — lead tələb statistikası.

### Analytics
- `GET /api/analytics/overview` — dashboard statistikası (lead sayları, konversiya).
- `GET /api/analytics/funnel` — funnel mərhələləri.
- `GET /api/analytics/agents` — satışçı performans metrikləri.
- `GET /api/analytics/products` — məhsul satış/tələb qrafikləri.
- `GET /api/analytics/campaigns` — kampaniya mənbələri.

### WhatsApp Inteqrasiyası
- `POST /api/integrations/whatsapp/connect` — QR və sessiya idarəsi.
- `POST /api/integrations/whatsapp/webhook` — mesajların CRM-ə yazılması.
- `POST /api/integrations/whatsapp/ai-detect` — şəkil göndərildikdə məhsul AI tanıma servisi.
- `GET /api/integrations/whatsapp/logs` — inteqrasiya statusu və xətalar.

### Sistem Monitorinqi
- `GET /api/system/health` — 200ms cavab məqsədinə nəzarət.
- `GET /api/system/errors` — error log-ları.
- `POST /api/system/alerts/test` — xəbərdarlıq kanallarını yoxlama.

## Texnoloji Qeydlər
- **Frontend**: React + Vite + Tailwind, komponent səviyyəsində state və server sorğuları üçün React Query (gələcək inteqrasiya).
- **Backend**: Node.js (NestJS və ya Express) + PostgreSQL + Prisma/TypeORM.
- **Realtime**: WebSocket və ya Webhook listenerləri ilə WhatsApp mesaj sinxronu.
- **AI Xidməti**: Vision API və ya xüsusi modeli ilə şəkildən məhsul tanıma.
- **Monitoring**: OpenTelemetry, Prometheus + Grafana, həmçinin Sentry ilə error izləmə.
