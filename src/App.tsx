import React, { useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  PhoneCall,
  MessageCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Package2,
  Activity,
  ShieldCheck,
  Wifi,
  RefreshCcw,
  Clock
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { cn } from './utils/cn';

type LeadStatus = 'Yeni' | 'Danışılır' | 'Gözləmədə' | 'Bağlanıb' | 'Itirilib';

type Message = {
  id: string;
  author: 'agent' | 'customer';
  content: string;
  timestamp: string;
};

type Lead = {
  id: string;
  fullName: string;
  phone: string;
  salesRep: string;
  desiredProduct: string;
  status: LeadStatus;
  lastActive: string;
  createdAt: string;
  whatsappLink: string;
  messages: Message[];
  interests: string[];
  quote: {
    amount: number;
    currency: string;
    terms: string;
    expiresAt: string;
  };
  notes: string;
};

type SalesAgent = {
  id: string;
  name: string;
  avatar: string;
  leads: number;
  weeklyClosed: number;
  monthlyClosed: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  leadDemand: number;
};

const leads: Lead[] = [
  {
    id: 'L-001',
    fullName: 'Aysel Məmmədova',
    phone: '+994501112233',
    salesRep: 'Murad Əliyev',
    desiredProduct: 'Smart Home Paket Pro',
    status: 'Danışılır',
    lastActive: '2024-04-18T09:30:00Z',
    createdAt: '2024-04-18T08:05:00Z',
    whatsappLink: 'https://wa.me/994501112233',
    messages: [
      {
        id: 'm1',
        author: 'customer',
        content: 'Smart Home Paket Pro haqqında daha çox məlumat verə bilərsiniz?',
        timestamp: '2024-04-18T08:05:00Z'
      },
      {
        id: 'm2',
        author: 'agent',
        content: 'Əlbəttə, paketə 6 kamera və AI dəstəyi daxildir. Demo təşkil edək?',
        timestamp: '2024-04-18T08:15:00Z'
      }
    ],
    interests: ['Smart Home Paket Pro', 'AI Təhlükəsizlik Modulu'],
    quote: {
      amount: 1299,
      currency: 'AZN',
      terms: '12 ay faizsiz, quraşdırma pulsuz',
      expiresAt: '2024-04-30'
    },
    notes: 'Müştəri may ayında yeni ofisinə köçür, sürətli quraşdırma lazımdır.'
  },
  {
    id: 'L-002',
    fullName: 'Orxan Qasımov',
    phone: '+994552224466',
    salesRep: 'Leyla Rzayeva',
    desiredProduct: 'Telehome Fiber 200',
    status: 'Yeni',
    lastActive: '2024-04-18T11:20:00Z',
    createdAt: '2024-04-18T10:55:00Z',
    whatsappLink: 'https://wa.me/994552224466',
    messages: [
      {
        id: 'm3',
        author: 'agent',
        content: 'Salam Orxan bəy, yeni fiber paketimizlə bağlı suallarınızı cavablandırmağa hazıram.',
        timestamp: '2024-04-18T11:00:00Z'
      }
    ],
    interests: ['Telehome Fiber 200'],
    quote: {
      amount: 69,
      currency: 'AZN',
      terms: 'Ayda 69 AZN, 24 aylıq müqavilə',
      expiresAt: '2024-04-25'
    },
    notes: 'Korporativ tariflə maraqlanır, əlavə IP ünvanı tələb edir.'
  },
  {
    id: 'L-003',
    fullName: 'Nigar Xəlilova',
    phone: '+994502221122',
    salesRep: 'Murad Əliyev',
    desiredProduct: 'Telehome Fiber 100',
    status: 'Bağlanıb',
    lastActive: '2024-04-17T16:45:00Z',
    createdAt: '2024-04-11T14:30:00Z',
    whatsappLink: 'https://wa.me/994502221122',
    messages: [
      {
        id: 'm4',
        author: 'agent',
        content: 'Sifarişiniz təsdiqləndi, quraşdırma komandamız sabah gələcək.',
        timestamp: '2024-04-17T16:30:00Z'
      }
    ],
    interests: ['Telehome Fiber 100', 'Wi-Fi Mesh'],
    quote: {
      amount: 59,
      currency: 'AZN',
      terms: 'Ayda 59 AZN, 12 aylıq müqavilə',
      expiresAt: '2024-04-15'
    },
    notes: 'Başqa kampaniyalara yönləndirmək üçün razıdır.'
  },
  {
    id: 'L-004',
    fullName: 'Kamran Rüstəmov',
    phone: '+994704563210',
    salesRep: 'Leyla Rzayeva',
    desiredProduct: 'Smart Alarm Seti',
    status: 'Gözləmədə',
    lastActive: '2024-04-16T12:15:00Z',
    createdAt: '2024-04-15T09:40:00Z',
    whatsappLink: 'https://wa.me/994704563210',
    messages: [
      {
        id: 'm5',
        author: 'customer',
        content: 'Qiymətə montaj daxildirmi?',
        timestamp: '2024-04-15T09:41:00Z'
      }
    ],
    interests: ['Smart Alarm Seti', 'Telehome Fiber 200'],
    quote: {
      amount: 899,
      currency: 'AZN',
      terms: '6 ay taksit, 2 il zəmanət',
      expiresAt: '2024-05-01'
    },
    notes: 'Maliyyə şöbəsindən təsdiq gözləyir.'
  },
  {
    id: 'L-005',
    fullName: 'Günel Hüseynova',
    phone: '+994503339988',
    salesRep: 'Murad Əliyev',
    desiredProduct: 'AI Təhlükəsizlik Modulu',
    status: 'Itirilib',
    lastActive: '2024-04-12T15:20:00Z',
    createdAt: '2024-04-10T10:00:00Z',
    whatsappLink: 'https://wa.me/994503339988',
    messages: [
      {
        id: 'm6',
        author: 'agent',
        content: 'Yeni kampaniyamız üçün geridönüş etmək istəyirəm.',
        timestamp: '2024-04-12T15:20:00Z'
      }
    ],
    interests: ['AI Təhlükəsizlik Modulu'],
    quote: {
      amount: 1099,
      currency: 'AZN',
      terms: 'Peşəkar quraşdırma daxil, 18 ay zəmanət',
      expiresAt: '2024-04-20'
    },
    notes: 'Rəqib şirkətə keçib, kampaniya yenilənəndə təkrar cəhd.'
  }
];

const agents: SalesAgent[] = [
  {
    id: 'A-01',
    name: 'Murad Əliyev',
    avatar: 'https://i.pravatar.cc/100?img=12',
    leads: 32,
    weeklyClosed: 6,
    monthlyClosed: 18
  },
  {
    id: 'A-02',
    name: 'Leyla Rzayeva',
    avatar: 'https://i.pravatar.cc/100?img=36',
    leads: 28,
    weeklyClosed: 5,
    monthlyClosed: 16
  },
  {
    id: 'A-03',
    name: 'Rauf Məmmədli',
    avatar: 'https://i.pravatar.cc/100?img=45',
    leads: 21,
    weeklyClosed: 4,
    monthlyClosed: 12
  }
];

const products: Product[] = [
  { id: 'P-001', name: 'Telehome Fiber 100', price: 59, currency: 'AZN', stock: 245, leadDemand: 58 },
  { id: 'P-002', name: 'Telehome Fiber 200', price: 69, currency: 'AZN', stock: 178, leadDemand: 74 },
  { id: 'P-003', name: 'Smart Home Paket Pro', price: 1299, currency: 'AZN', stock: 32, leadDemand: 41 },
  { id: 'P-004', name: 'Smart Alarm Seti', price: 899, currency: 'AZN', stock: 54, leadDemand: 25 },
  { id: 'P-005', name: 'AI Təhlükəsizlik Modulu', price: 1099, currency: 'AZN', stock: 17, leadDemand: 33 }
];

const statusStyles: Record<LeadStatus, string> = {
  Yeni: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40',
  Danışılır: 'bg-sky-500/10 text-sky-300 border border-sky-500/40',
  Gözləmədə: 'bg-amber-500/10 text-amber-200 border border-amber-500/40',
  Bağlanıb: 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/40',
  Itirilib: 'bg-rose-500/10 text-rose-200 border border-rose-500/40'
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('az-AZ', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead>(leads[0]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'Hamısı',
    product: 'Hamısı',
    salesRep: 'Hamısı',
    dateRange: 'son7'
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = lead.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.phone.includes(filters.search) ||
        lead.desiredProduct.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === 'Hamısı' || lead.status === filters.status;
      const matchesProduct = filters.product === 'Hamısı' || lead.desiredProduct === filters.product;
      const matchesSalesRep = filters.salesRep === 'Hamısı' || lead.salesRep === filters.salesRep;

      const createdAt = new Date(lead.createdAt).getTime();
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      let matchesDate = true;
      if (filters.dateRange === 'bugun') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        matchesDate = createdAt >= today.getTime();
      } else if (filters.dateRange === 'son7') {
        matchesDate = now - createdAt <= oneDay * 7;
      } else if (filters.dateRange === 'son30') {
        matchesDate = now - createdAt <= oneDay * 30;
      }

      return matchesSearch && matchesStatus && matchesProduct && matchesSalesRep && matchesDate;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = leads.length;
    const active = leads.filter((lead) => lead.status === 'Yeni' || lead.status === 'Danışılır' || lead.status === 'Gözləmədə').length;
    const todayCount = leads.filter((lead) => {
      const createdAt = new Date(lead.createdAt);
      const today = new Date();
      return createdAt.toDateString() === today.toDateString();
    }).length;
    const closed = leads.filter((lead) => lead.status === 'Bağlanıb').length;
    const conversion = total === 0 ? 0 : Math.round((closed / total) * 100);

    return {
      total,
      active,
      todayCount,
      conversion
    };
  }, []);

  const funnel = [
    { stage: 'Yeni Lead', count: 124 },
    { stage: 'Əlaqədə', count: 86 },
    { stage: 'Təklif Göndərildi', count: 58 },
    { stage: 'Bağlanıb', count: 27 }
  ];

  const leadSources = [
    { name: 'Facebook Kampaniyası', value: 44 },
    { name: 'Instagram Ads', value: 32 },
    { name: 'Referal', value: 18 },
    { name: 'Sayt Forması', value: 30 }
  ];

  const orderStatus = [
    { status: 'Təsdiq gözləyir', count: 12 },
    { status: 'Göndərilib', count: 8 },
    { status: 'Tamamlanıb', count: 21 }
  ];

  const toggleLeadSelection = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white md:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Workflow className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Telehome CRM</p>
              <h1 className="text-lg font-semibold md:text-xl">Satış performansı və müştəri idarəetməsi</h1>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              AI Asistant
            </button>
            <button className="rounded-full border border-slate-800 px-3 py-1 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
              Canlı izləmə
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6">
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Toplam Lead"
                value={stats.total.toString()}
                icon={Users}
                trend={{ value: '+18%', direction: 'up' }}
                description="Son 30 gün"
              />
              <StatCard
                title="Aktiv Lead"
                value={stats.active.toString()}
                icon={Activity}
                trend={{ value: '+6%', direction: 'up' }}
                description="Yeni, danışılır və gözləmədə"
              />
              <StatCard
                title="Bugünkü yeni Lead"
                value={stats.todayCount.toString()}
                icon={Clock}
                description="Səhər 00:00-dan bəri"
              />
              <StatCard
                title="Konversiya"
                value={`${stats.conversion}%`}
                icon={TrendingUp}
                trend={{ value: '-2%', direction: 'down' }}
                description="Bağlanan leadlər / toplam"
              />
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-lg shadow-indigo-900/10 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Filter className="h-4 w-4" />
                  Filtrlər
                </div>
                <div className="grid gap-3 md:grid-cols-5">
                  <label className="relative flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-slate-500" />
                    <input
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      placeholder="Axtarış: ad, nömrə, məhsul"
                      value={filters.search}
                      onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                    />
                  </label>
                  <select
                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    value={filters.status}
                    onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
                  >
                    <option>Hamısı</option>
                    <option>Yeni</option>
                    <option>Danışılır</option>
                    <option>Gözləmədə</option>
                    <option>Bağlanıb</option>
                    <option>Itirilib</option>
                  </select>
                  <select
                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    value={filters.product}
                    onChange={(event) => setFilters((prev) => ({ ...prev, product: event.target.value }))}
                  >
                    <option>Hamısı</option>
                    {products.map((product) => (
                      <option key={product.id}>{product.name}</option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    value={filters.salesRep}
                    onChange={(event) => setFilters((prev) => ({ ...prev, salesRep: event.target.value }))}
                  >
                    <option>Hamısı</option>
                    {agents.map((agent) => (
                      <option key={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                    value={filters.dateRange}
                    onChange={(event) => setFilters((prev) => ({ ...prev, dateRange: event.target.value }))}
                  >
                    <option value="bugun">Bugün</option>
                    <option value="son7">Son 7 gün</option>
                    <option value="son30">Son 30 gün</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-7">
              <div className="space-y-4 xl:col-span-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Müştərilər</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Activity className="h-4 w-4" />
                    Real-time yenilənir
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-lg shadow-indigo-900/10">
                  <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                    <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                            onChange={(event) =>
                              setSelectedLeads(event.target.checked ? filteredLeads.map((lead) => lead.id) : [])
                            }
                            className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                          />
                        </th>
                        <th className="px-4 py-3">Müştəri</th>
                        <th className="px-4 py-3">Satış nümayəndəsi</th>
                        <th className="px-4 py-3">Məhsul</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Son aktivlik</th>
                        <th className="px-4 py-3 text-right">Əməliyyat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="cursor-pointer bg-slate-950/40 hover:bg-indigo-500/10"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead.id)}
                              onChange={() => toggleLeadSelection(lead.id)}
                              className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-100">{lead.fullName}</div>
                            <div className="text-xs text-slate-400">{lead.phone}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-300">{lead.salesRep}</td>
                          <td className="px-4 py-3 text-sm text-slate-300">{lead.desiredProduct}</td>
                          <td className="px-4 py-3">
                            <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', statusStyles[lead.status])}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-300">{formatDate(lead.lastActive)}</td>
                          <td className="px-4 py-3 text-right" onClick={(event) => event.stopPropagation()}>
                            <a
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/60 px-3 py-1 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10"
                              href={lead.whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-lg shadow-indigo-900/10 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Users className="h-4 w-4" />
                    Seçilmiş lead: {selectedLeads.length}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <select className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none">
                      <option>Statusu dəyiş</option>
                      <option>Yeni</option>
                      <option>Danışılır</option>
                      <option>Gözləmədə</option>
                      <option>Bağlanıb</option>
                      <option>Itirilib</option>
                    </select>
                    <select className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none">
                      <option>Nümayəndə təyin et</option>
                      {agents.map((agent) => (
                        <option key={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                    <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400">
                      <RefreshCcw className="h-4 w-4" />
                      Tətbiq et
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 xl:col-span-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Lead profili</h3>
                    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', statusStyles[selectedLead.status])}>
                      {selectedLead.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Tam adı</span>
                      <span className="font-medium text-slate-100">{selectedLead.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Telefon</span>
                      <a className="font-medium text-indigo-300 hover:text-indigo-200" href={`tel:${selectedLead.phone}`}>
                        {selectedLead.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Satış nümayəndəsi</span>
                      <span className="font-medium text-slate-100">{selectedLead.salesRep}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Məhsul maraqları</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedLead.interests.map((interest) => (
                          <span key={interest} className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/5 px-3 py-1 text-xs text-indigo-200">
                            <Star className="h-3 w-3" />
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Təklif</span>
                      <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                        <div className="text-lg font-semibold text-white">
                          {selectedLead.quote.amount} {selectedLead.quote.currency}
                        </div>
                        <div className="text-xs text-slate-400">{selectedLead.quote.terms}</div>
                        <div className="mt-2 text-xs text-amber-300">Müddət: {selectedLead.quote.expiresAt}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Son qeydlər</span>
                      <p className="mt-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm leading-relaxed text-slate-300">
                        {selectedLead.notes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                  <h3 className="text-lg font-semibold">Mesaj tarixçəsi</h3>
                  <div className="mt-4 space-y-4">
                    {selectedLead.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'rounded-2xl border border-slate-800/60 p-3 text-sm shadow-inner backdrop-blur',
                          message.author === 'agent'
                            ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-100'
                            : 'bg-slate-900/60 text-slate-200'
                        )}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{message.author === 'agent' ? 'Telehome' : selectedLead.fullName}</span>
                          <span>{formatDate(message.timestamp)}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{message.content}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp-da cavabla
                  </button>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Satış komandası</h3>
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="mt-4 space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="flex items-center gap-3">
                        <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-full border border-slate-800 object-cover" />
                        <div>
                          <div className="font-semibold text-slate-100">{agent.name}</div>
                          <div className="text-xs text-slate-400">Lead sayı: {agent.leads}</div>
                        </div>
                      </div>
                      <div className="flex gap-6 text-xs">
                        <div className="flex flex-col items-end">
                          <span className="text-slate-400">Həftəlik</span>
                          <span className="text-sm font-semibold text-emerald-300">{agent.weeklyClosed}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-slate-400">Aylıq</span>
                          <span className="text-sm font-semibold text-indigo-300">{agent.monthlyClosed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">WhatsApp inteqrasiyası</h3>
                  <PhoneCall className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="font-medium text-slate-100">Söhbət panelində real-time</p>
                      <p className="text-xs text-slate-400">Göndərilən və qəbul edilən mesajlar CRM-də avtomatik qeyd olunur.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <Sparkles className="mt-0.5 h-4 w-4 text-indigo-400" />
                    <div>
                      <p className="font-medium text-slate-100">AI məhsul tanıma</p>
                      <p className="text-xs text-slate-400">Müştəri şəkil göndərdikdə məhsul avtomatik tanınır və təklif forması hazırlanır.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <Wifi className="mt-0.5 h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="font-medium text-slate-100">QR ilə sürətli qoşulma</p>
                      <p className="text-xs text-slate-400">Komanda üzvləri WhatsApp Business hesabını saniyələr içində sinxronlaşdırır.</p>
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20">
                    <PhoneCall className="h-4 w-4" />
                    QR kodu yarat
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10 xl:col-span-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">İcazələr və rollar</h3>
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="mt-4 space-y-4 text-sm text-slate-300">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="font-medium text-white">Admin</p>
                    <p className="mt-1 text-xs text-slate-400">Bütün leadlər, analitika və inteqrasiyalara tam giriş. Bulk əməliyyatları və rol idarəsini icra edir.</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <p className="font-medium text-white">Satışçı</p>
                    <p className="mt-1 text-xs text-slate-400">Yalnız ona təyin edilən leadləri və əlaqəli sifarişləri görür. Öz performans panelinə çıxış var.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/5 p-3 text-xs text-indigo-100">
                    İcazə dəyişiklikləri audit log-da saxlanır və real-time xəbərdarlıqlar göndərilir.
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Məhsul kataloqu</h3>
                  <Package2 className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
                  <table className="min-w-full divide-y divide-slate-800 text-sm">
                    <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3 text-left">Məhsul</th>
                        <th className="px-4 py-3 text-left">Qiymət</th>
                        <th className="px-4 py-3 text-left">Stok</th>
                        <th className="px-4 py-3 text-right">Tələb</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {products.map((product) => (
                        <tr key={product.id} className="bg-slate-950/40">
                          <td className="px-4 py-3 font-medium text-slate-100">{product.name}</td>
                          <td className="px-4 py-3 text-slate-300">
                            {product.price} {product.currency}
                          </td>
                          <td className="px-4 py-3 text-slate-300">{product.stock} ədəd</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                              <TrendingUp className="h-3 w-3" />
                              {product.leadDemand}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <div>
                      Lead-dən sifariş yaratmaq
                      <p className="text-xs text-slate-400">Lead kartından birbaşa sifarişə keçid, status izləmə.</p>
                    </div>
                    <button className="rounded-lg border border-indigo-500/40 px-3 py-2 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-500/10">
                      Sifariş aç
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {orderStatus.map((order) => (
                      <span key={order.status} className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
                        <Activity className="h-3 w-3 text-emerald-300" />
                        {order.status}: {order.count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Analitika paneli</h3>
                  <TrendingUp className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="mt-4 space-y-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Konversiya funnel</h4>
                    <div className="mt-3 space-y-3">
                      {funnel.map((item, index) => (
                        <div key={item.stage} className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>{item.stage}</span>
                            <span>{item.count}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400"
                              style={{ width: `${Math.max(20, 100 - index * 18)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Satışçı performansı</h4>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      {agents.map((agent) => (
                        <div key={agent.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
                          <p className="font-semibold text-slate-100">{agent.name.split(' ')[0]}</p>
                          <p className="mt-1 text-emerald-300">{agent.weeklyClosed} həftəlik</p>
                          <p className="text-indigo-300">{agent.monthlyClosed} aylıq</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Kampaniya mənbələri</h4>
                    <div className="mt-3 space-y-2 text-xs text-slate-300">
                      {leadSources.map((source) => (
                        <div key={source.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                          <span>{source.name}</span>
                          <span className="flex items-center gap-1 text-indigo-200">
                            <ArrowUpRight className="h-3 w-3" />
                            {source.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <h3 className="text-lg font-semibold">Performance & UX</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <Activity className="mt-0.5 h-4 w-4 text-emerald-400" />
                    <span>Real-time axtarış və filtr nəticələri ilə <strong className="text-white">&lt;200ms</strong> cavab müddətləri.</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <Sparkles className="mt-0.5 h-4 w-4 text-indigo-400" />
                    <span>AI ilə inteqrasiya olunmuş tövsiyə sistemi və avtomatik error bildirişləri.</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    <Clock className="mt-0.5 h-4 w-4 text-amber-300" />
                    <span>Əlaqə kəsildikdə və ya inteqrasiya uğursuzluğunda sistem xəbərdarlıq göndərir.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
                <h3 className="text-lg font-semibold">SEO & Hosting</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    SEO uyğun URL strukturu, meta tag-lar və schema.org markup dəstəyi.
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    Telehome.az domeni üçün CDN ilə qlobal çatdırılma, HTTP/3 və SSL avtomatlaşdırması.
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                    Google Analytics 4 və Meta Pixel inteqrasiyası ilə kampaniya ölçümü.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  const trendStyles = {
    up: 'bg-emerald-500/10 text-emerald-300',
    down: 'bg-rose-500/10 text-rose-300',
    neutral: 'bg-slate-800 text-slate-300'
  } as const;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-lg shadow-indigo-900/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{description}</span>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold',
              trendStyles[trend.direction]
            )}
          >
            {trend.direction === 'up' && <ArrowUpRight className="h-3 w-3" />}
            {trend.direction === 'down' && <ArrowDownRight className="h-3 w-3" />}
            {trend.direction === 'neutral' && <Clock className="h-3 w-3" />}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
