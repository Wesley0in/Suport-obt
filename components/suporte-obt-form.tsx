"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { KontikLogo } from "./kontik-logo"
import { SearchableSelect } from "./searchable-select"
import { FormField } from "./form-field"
import { SectionDivider } from "./section-divider"
import { CheckCircle2, Copy, Check, ExternalLink } from "lucide-react"

// ─── Webhook URL ──────────────────────────────────────────────────────────────
// Aponta para a API route do próprio projeto.
// Crie app/api/submit/route.ts igual ao dos outros formulários.
const WEBHOOK_URL = "/api/submit"

// ─── Option lists ──────────────────────────────────────────────────────────────
const TIPOS = ["Request", "Incident"]

const GRUPOS_EMPRESA = [
  "G4 Educação", "Grupo Abegas", "Grupo Acelen", "Grupo Aché", "Grupo Action Line",
  "Grupo Adidas", "Grupo ADM - Archer Daniels Midland Company", "Grupo Aeroleo",
  "Grupo AET TANKERS", "Grupo Agoro Carbon", "Grupo Airbus - Helibras", "Grupo Alares",
  "Grupo Alliança", "Grupo Amadeus", "Grupo Amcham Brasil", "Grupo Amway",
  "Grupo Arcadis", "Grupo Arezzo Varejo", "Grupo Argo", "Grupo Artesano Urbanismo",
  "Grupo Arxada", "Grupo Aspen Pharma", "Grupo Atento", "Grupo Atlas Copco",
  "Grupo Atos", "Grupo Avaya", "Grupo Avenida", "Grupo Axa", "Grupo Bahia Am Renda",
  "Grupo Bahia Mineração", "Grupo Baker McKenzie - Trench Rossi", "Grupo Banco Bbm",
  "Grupo Banco Caixa Geral Brasil", "Grupo Banco Genial", "Grupo Basf", "Grupo BAT",
  "Grupo Bernoulli Educação", "Grupo BHAirport", "Grupo Bioage", "Grupo Biolab",
  "Grupo Biomerieux", "Grupo Blu Pagamentos", "Grupo Bosch", "Grupo Braskem",
  "Grupo Bristow", "Grupo Brq It Services", "Grupo Camargo Correa", "Grupo Carmo Energy",
  "Grupo Carol Bassi", "Grupo Casas Bahia", "Grupo Case", "Grupo Cbo", "Grupo Chanel",
  "Grupo Cielo", "Grupo Claro Sa", "Grupo Cma", "Grupo Cmoc", "Grupo Cobra",
  "Grupo Comgas", "Grupo Conceba", "Grupo Concer", "Grupo Constellation",
  "Grupo Consulado Britanico", "Grupo Credibrf", "Grupo Credipronto", "Grupo Cvc Capital",
  "Grupo Cyncly", "Grupo Deloitte", "Grupo Diageo", "Grupo Eai – Grupo Ultra",
  "Grupo Ecp", "Grupo Efi", "Grupo Elanco", "Grupo Eletrobrás", "Grupo Elis Energia",
  "Grupo Enaex", "Grupo Energisa", "Grupo Enerpac", "Grupo Engelhart Ctp",
  "Grupo Epson", "Grupo Erb", "Grupo Estre Ambiental", "Grupo Extrafarma",
  "Grupo Falcon Active", "Grupo FCDO", "Grupo Fcm Global", "Grupo Ferreira Costa",
  "Grupo Firmenich", "Grupo First Solar", "Grupo Fm Global", "Grupo Fortlev",
  "Grupo Fraport", "Grupo Fs Bioenergia", "Grupo Garrett", "Grupo Gic", "Grupo Glory",
  "Grupo Greif", "Grupo Gtm", "Grupo HIAE - Hospital Albert Einstein", "Grupo Honeywell",
  "Grupo Hotel", "Grupo Hotelbeds", "Grupo HPE – Mitsubishi", "Grupo Htb",
  "Grupo Hypera", "Grupo Ibemapar", "Grupo Ihs", "Grupo Inframerica",
  "Grupo Innomotics", "Grupo Inovents", "Grupo Instituto Unibanco", "Grupo Intecom",
  "Grupo Intercement", "Grupo Invepar", "Grupo Ipiranga", "Grupo Iron Mountain",
  "Grupo Isdin", "Grupo Ixom", "Grupo Jda", "Grupo Jealsa", "Grupo Jti",
  "Grupo Kellogg", "Grupo Kontik", "Grupo Kontik Club", "Grupo Kontrip",
  "Grupo Kpmg", "Grupo Kws", "Grupo Lazer", "Grupo Light", "Grupo Livanova",
  "Grupo Lojas Marisas", "Grupo Lonza", "Grupo Lumileds", "Grupo Lyondell Basell",
  "Grupo Mars", "Grupo Mattos Filho", "Grupo Mdcpar", "Grupo Med Grupo",
  "Grupo Metro Rio", "Grupo Millenium", "Grupo MMG", "Grupo Motiva", "Grupo Mover",
  "Grupo Ndb (New Developtment Bank)", "Grupo Neon Pagamentos", "Grupo Nepean",
  "Grupo New Zeland Trade (NZTE)", "Grupo Nielsen Iq", "Grupo Novonor (Odb)",
  "Grupo OCCPar", "Grupo Ocean Pact", "Grupo Odontoprev", "Grupo Orizon",
  "Grupo Oxiteno", "Grupo Parexel", "Grupo Participações Morro Vermelho",
  "Grupo Pátria", "Grupo Pepsico", "Grupo Petroreconcavo", "Grupo Phamacopeia",
  "Grupo Pra", "Grupo Primo Rico", "Grupo PWC", "Grupo Rainforest", "Grupo Recovery",
  "Grupo Rede Deville", "Grupo Rede Gazeta", "Grupo Renner", "Grupo Rhenus",
  "Grupo Rheotech", "Grupo Rio Galeao", "Grupo Rio Verde", "Grupo Rm Cursos Medicos",
  "Grupo Robinson Crusoe", "Grupo Rps", "Grupo Rubens Naves Santos Jr Adv",
  "Grupo S&P", "Grupo SAE", "Grupo Samsung", "Grupo Santista",
  "Grupo Sbd - Stanley Black & Decker", "Grupo Scantech", "Grupo Seco Ambiental",
  "Grupo Ses", "Grupo Sgbr", "Grupo Shell", "Grupo Sibelco", "Grupo Sigura",
  "Grupo Sindicom", "Grupo Solubio", "Grupo Sompo", "Grupo Sony Pictures",
  "Grupo South 32", "Grupo Spotify", "Grupo SSe do Brasil", "Grupo Styrolution",
  "Grupo Syngenta", "Grupo Syntegon", "Grupo Taesa", "Grupo Tecban",
  "Grupo Tecnomyl", "Grupo Tectoy", "Grupo Temasek", "Grupo Tennant Company",
  "Grupo Tereos", "Grupo The Body Shop", "Grupo Tpi", "Grupo Track & Field",
  "Grupo Trafigura", "Grupo Tupperware", "Grupo Ubisoft", "Grupo Uhe Itaocara",
  "Grupo Ultracargo", "Grupo Ultragaz", "Grupo Ultrapar", "Grupo Única",
  "Grupo Uol", "Grupo Valentino", "Grupo Verizon", "Grupo Vertex", "Grupo Vexia",
  "Grupo Visagio", "Grupo Voltalia", "Grupo Wallenius", "Grupo Weir Group",
  "Grupo Winity", "Grupo World Vision", "Grupo Xp Investimentos",
  "Grupo Xylem Brasil", "Grupo Yamaha", "Grupo Zf", "Grupo Zupper",
]

const SISTEMAS = [
  "AgentPort", "Argo", "B2B", "Benner", "Chat FCM", "Concur", "Cytric",
  "Gover", "Lemontech", "Paytrack", "Platform", "Portal Corporativo", "Sabre", "Toou",
]

const CATEGORIAS_SUPORTE_OBT = [
  "Acesso", "Cadastro", "Cargas", "Comunicados", "Configuração", "Dúvidas",
  "Erro/Bug", "Falha/Intermitência", "Filas", "Forma de Pagamento",
  "Melhorias/Desenvolvimento", "Política", "Relatório", "Senha", "Treinamento",
]

const SERVICOS = [
  "Acordos", "Aéreo", "Aprovação", "Atualização de Cadastro", "CC",
  "Centro de custo", "Delegação", "Expense", "Forma de Pgto", "Hotel",
  "Hotel homologado", "Integração", "MFA/Token", "Mobile", "N/A",
  "Os_Solicitação", "PortalCorporativo", "Rodoviário", "Senha", "Serviços",
  "Setup", "Terceiro", "Usuário", "VCN", "Veículo",
]

const PRIORIDADES = ["Baixa", "Normal", "Alta", "Urgente"]

const FILAS_ATENDIMENTO = [
  "Disponível", "Em tratativa", "Pendente Cliente", "Pendente fornecedor",
  "Suporte Implantação", "Resolvido", "Fechado",
]

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  tipo: string
  grupoEmpresa: string
  sistema: string
  categoriaSuporteObt: string
  servico: string
  observacoes: string
  prioridade: string
  filaAtendimento: string
}

interface FormErrors {
  grupoEmpresa?: string
  sistema?: string
  categoriaSuporteObt?: string
  filaAtendimento?: string
}

interface SubmitResult {
  id: number
  itemUrl: string
}

const INITIAL_STATE: FormState = {
  tipo: "",
  grupoEmpresa: "",
  sistema: "",
  categoriaSuporteObt: "",
  servico: "",
  observacoes: "",
  prioridade: "",
  filaAtendimento: "",
}

// ─── Estilos compartilhados (CSS variables do tema) ───────────────────────────
const inputBase =
  "w-full px-3 py-2.5 text-sm rounded-md border border-border bg-card text-foreground outline-none transition-all focus:ring-2 focus:ring-offset-0 focus:ring-[var(--cw-accent)]/40 focus:border-[var(--cw-accent)] placeholder:text-muted-foreground"
const inputError = "border-destructive focus:ring-destructive/30"

function NativeSelect({
  options, value, onChange, id, error, required,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  id?: string
  error?: string
  required?: boolean
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          inputBase,
          "appearance-none pr-9 cursor-pointer",
          !value && "text-muted-foreground",
          error && inputError
        )}
      >
        <option value="" disabled>Selecione...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

// ─── Modal de sucesso com link ────────────────────────────────────────────────
function SuccessModal({
  result, onClose, onNewForm,
}: {
  result: SubmitResult
  onClose: () => void
  onNewForm: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result.itemUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const el = document.createElement("textarea")
      el.value = result.itemUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }, [result.itemUrl])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-card text-foreground rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center gap-5 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--cw-accent) 18%, transparent)" }}
        >
          <CheckCircle2 size={36} style={{ color: "var(--cw-accent)" }} />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">Formulário enviado com sucesso!</h2>
          <p className="text-sm mt-1 text-muted-foreground">
            O registro foi criado na lista. Copie o link abaixo e cole no atributo do Chatwoot para liberar a resolução da conversa.
          </p>
        </div>

        <div className="w-full text-center text-xs font-medium py-1 px-3 rounded-full bg-muted text-muted-foreground">
          ID do registro: <span className="text-foreground font-bold">#{result.id}</span>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5">
            <span className="flex-1 text-xs truncate select-all text-foreground" title={result.itemUrl}>
              {result.itemUrl}
            </span>
            <a
              href={result.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-1 rounded hover:bg-border transition-colors text-muted-foreground"
              title="Abrir no SharePoint"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          <button
            onClick={handleCopy}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all text-white",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--cw-accent)]",
              copied ? "opacity-90" : "hover:brightness-110 active:scale-[0.99]"
            )}
            style={{ background: copied ? "#16a34a" : "var(--cw-accent)" }}
          >
            {copied ? <><Check size={16} />Link copiado!</> : <><Copy size={16} />Copiar link</>}
          </button>
        </div>

        <button
          onClick={onNewForm}
          className="text-sm font-medium underline mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          Preencher novo formulário
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SuporteObtForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)

  // ── Dados capturados do Chatwoot ───────────────────────────────────────────
  const [conversationId, setConversationId] = useState<string>("")
  const [agenteName, setAgenteName] = useState<string>("")

  // ── Detecção de tema automática ────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return

    function applyTheme(isDark: boolean) {
      document.documentElement.classList.toggle("dark", isDark)
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    applyTheme(mq.matches)
    const onChange = (e: MediaQueryListEvent) => applyTheme(e.matches)
    mq.addEventListener("change", onChange)

    // Permite forçar tema via ?theme=dark ou ?theme=light
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get("theme")
    if (themeParam === "dark") applyTheme(true)
    if (themeParam === "light") applyTheme(false)

    return () => mq.removeEventListener("change", onChange)
  }, [])

  // ── Captura conversation_id + agente via Chatwoot ──────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get("conversation_id")
    if (fromUrl) setConversationId(fromUrl)

    function findConversationId(data: any, depth = 0): string | null {
      if (!data || typeof data !== "object" || depth > 6) return null
      if (data.conversation_id != null) return String(data.conversation_id)
      if (data.conversation?.id != null) return String(data.conversation.id)
      if (data.id != null && Array.isArray(data.messages)) return String(data.id)
      if (Array.isArray(data.messages) && data.messages[0]?.conversation_id != null)
        return String(data.messages[0].conversation_id)
      for (const key in data) {
        if (key === "window" || key === "parent" || key === "top") continue
        const found = findConversationId(data[key], depth + 1)
        if (found) return found
      }
      return null
    }

    function findAgentName(data: any, depth = 0): string | null {
      if (!data || typeof data !== "object" || depth > 6) return null
      if (data.assignee?.name && typeof data.assignee.name === "string") return data.assignee.name
      if (data.assignee?.available_name && typeof data.assignee.available_name === "string") return data.assignee.available_name
      if (data.meta?.assignee?.name) return data.meta.assignee.name
      if (data.conversation?.meta?.assignee?.name) return data.conversation.meta.assignee.name
      if (data.current_agent?.name) return data.current_agent.name
      if (data.currentAgent?.name) return data.currentAgent.name
      if (data.agent?.name) return data.agent.name
      for (const key in data) {
        if (key === "window" || key === "parent" || key === "top") continue
        const found = findAgentName(data[key], depth + 1)
        if (found) return found
      }
      return null
    }

    const handleMessage = (event: MessageEvent) => {
      let eventData
      try {
        eventData = typeof event.data === "string" ? JSON.parse(event.data) : event.data
      } catch { return }
      if (!eventData) return
      const id = findConversationId(eventData)
      if (id) setConversationId((prev) => prev || id)
      const agent = findAgentName(eventData)
      if (agent) setAgenteName((prev) => prev || agent)
    }

    window.addEventListener("message", handleMessage)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage("chatwoot-dashboard-app:fetch-info", "*")
    }
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.grupoEmpresa) e.grupoEmpresa = "Campo obrigatório"
    if (!form.sistema) e.sistema = "Campo obrigatório"
    if (!form.categoriaSuporteObt) e.categoriaSuporteObt = "Campo obrigatório"
    if (!form.filaAtendimento) e.filaAtendimento = "Campo obrigatório"
    return e
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError("")

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      let firstErrorEl: HTMLElement | null = null
      if (errs.grupoEmpresa) firstErrorEl = document.getElementById("grupoEmpresa")
      else if (errs.sistema) firstErrorEl = document.getElementById("sistema")
      else if (errs.categoriaSuporteObt) firstErrorEl = document.getElementById("categoriaSuporteObt")
      else if (errs.filaAtendimento) firstErrorEl = document.getElementById("filaAtendimento")
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        // Dados capturados do Chatwoot
        conversation_id: conversationId,
        agente: agenteName,
        // Campos do formulário
        tipo: form.tipo || null,
        grupo_empresa: form.grupoEmpresa,
        sistema: form.sistema,
        categoria_suporte_obt: form.categoriaSuporteObt,
        servico: form.servico || null,
        observacoes: form.observacoes.trim() || null,
        prioridade: form.prioridade || null,
        fila_atendimento_suporte_obt: form.filaAtendimento,
      }

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json() as SubmitResult
      setSubmitResult(data)

    } catch (err) {
      console.error("Erro no submit:", err)
      setSubmitError(
        err instanceof Error
          ? `Erro ao enviar formulário: ${err.message}`
          : "Erro ao enviar formulário. Tente novamente."
      )
    } finally {
      setSubmitting(false)
    }
  }

  function handleCloseModal() { setSubmitResult(null) }

  function handleNewForm() {
    setSubmitResult(null)
    setForm(INITIAL_STATE)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const badgeStyle = {
    background: "color-mix(in srgb, var(--cw-accent) 14%, transparent)",
    color: "var(--cw-accent)",
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {submitResult && (
        <SuccessModal result={submitResult} onClose={handleCloseModal} onNewForm={handleNewForm} />
      )}

      <main className="min-h-screen py-10 px-4 font-sans bg-background text-foreground">
        <div className="mx-auto w-full max-w-[720px]">
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Header bar — azul do Chatwoot */}
            <div className="h-1.5 w-full" style={{ background: "var(--cw-accent)" }} />

            <div className="px-8 pt-8 pb-10 sm:px-10">
              <div className="flex justify-center mb-6">
                <KontikLogo />
              </div>

              <div className="text-center mb-8">
                <h1 className="text-xl font-bold tracking-tight text-balance text-foreground">
                  Suporte OBT
                </h1>
                <p className="text-sm mt-1.5 leading-relaxed text-muted-foreground">
                  Preencha todos os campos obrigatórios antes de finalizar o atendimento
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  Campos marcados com{" "}
                  <span style={{ color: "var(--destructive, #E31F26)" }}>*</span> são obrigatórios
                </p>

                {/* Badges de contexto do Chatwoot */}
                {(conversationId || agenteName) && (
                  <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                    {conversationId && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={badgeStyle}>
                        <span>Conversa</span>
                        <span className="font-bold">#{conversationId}</span>
                      </div>
                    )}
                    {agenteName && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={badgeStyle}>
                        <span>Agente:</span>
                        <span className="font-bold">{agenteName}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

                {/* ── Seção: Identificação ───────────────────────────────── */}
                <SectionDivider title="Identificação" />

                <FormField label="ID da Conversa (Chatwoot)" htmlFor="conversationId">
                  <input
                    id="conversationId"
                    type="text"
                    inputMode="numeric"
                    value={conversationId}
                    onChange={(e) => setConversationId(e.target.value.replace(/\D/g, ""))}
                    placeholder="Capturado automaticamente ao abrir pelo Chatwoot"
                    className={inputBase}
                  />
                </FormField>

                <FormField label="Agente (Chatwoot)" htmlFor="agenteName">
                  <input
                    id="agenteName"
                    type="text"
                    value={agenteName}
                    onChange={(e) => setAgenteName(e.target.value)}
                    placeholder="Capturado automaticamente ao abrir pelo Chatwoot"
                    className={inputBase}
                  />
                </FormField>

                <FormField label="Tipo" htmlFor="tipo">
                  <NativeSelect id="tipo" options={TIPOS} value={form.tipo} onChange={(v) => set("tipo", v)} />
                </FormField>

                <FormField label="Grupo Empresa" required error={errors.grupoEmpresa} htmlFor="grupoEmpresa">
                  <SearchableSelect
                    id="grupoEmpresa"
                    options={GRUPOS_EMPRESA}
                    value={form.grupoEmpresa}
                    onChange={(v) => { setForm((prev) => ({ ...prev, grupoEmpresa: v })); setErrors((prev) => ({ ...prev, grupoEmpresa: undefined })) }}
                    error={errors.grupoEmpresa}
                    required
                  />
                </FormField>

                <FormField label="Sistema" required error={errors.sistema} htmlFor="sistema">
                  <NativeSelect id="sistema" options={SISTEMAS} value={form.sistema} onChange={(v) => set("sistema", v)} error={errors.sistema} required />
                </FormField>

                {/* ── Seção: Classificação ───────────────────────────────── */}
                <SectionDivider title="Classificação" />

                <FormField label="Categoria Suporte OBT" required error={errors.categoriaSuporteObt} htmlFor="categoriaSuporteObt">
                  <NativeSelect id="categoriaSuporteObt" options={CATEGORIAS_SUPORTE_OBT} value={form.categoriaSuporteObt} onChange={(v) => set("categoriaSuporteObt", v)} error={errors.categoriaSuporteObt} required />
                </FormField>

                <FormField label="Serviço" htmlFor="servico">
                  <NativeSelect id="servico" options={SERVICOS} value={form.servico} onChange={(v) => set("servico", v)} />
                </FormField>

                <FormField label="Prioridade" htmlFor="prioridade">
                  <NativeSelect id="prioridade" options={PRIORIDADES} value={form.prioridade} onChange={(v) => set("prioridade", v)} />
                </FormField>

                {/* ── Seção: Detalhes ────────────────────────────────────── */}
                <SectionDivider title="Detalhes" />

                <FormField label="Observações" htmlFor="observacoes">
                  <textarea
                    id="observacoes"
                    rows={4}
                    value={form.observacoes}
                    onChange={(e) => set("observacoes", e.target.value)}
                    placeholder="Descreva detalhes adicionais..."
                    className={cn(inputBase, "resize-none")}
                  />
                </FormField>

                {/* ── Seção: Fila ────────────────────────────────────────── */}
                <SectionDivider title="Fila" />

                <FormField label="Fila de Atendimento Suporte OBT" required error={errors.filaAtendimento} htmlFor="filaAtendimento">
                  <NativeSelect id="filaAtendimento" options={FILAS_ATENDIMENTO} value={form.filaAtendimento} onChange={(v) => set("filaAtendimento", v)} error={errors.filaAtendimento} required />
                </FormField>

                {/* ── Submit error ───────────────────────────────────────── */}
                {submitError && (
                  <p
                    className="text-sm font-medium text-center py-2 px-3 rounded-md"
                    style={{ background: "color-mix(in srgb, var(--destructive, #E31F26) 12%, transparent)", color: "var(--destructive, #E31F26)" }}
                    role="alert"
                  >
                    {submitError}
                  </p>
                )}

                {/* ── Submit button ──────────────────────────────────────── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "w-full py-3 rounded-md text-sm font-semibold tracking-wide transition-all text-white",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--cw-accent)]",
                      submitting ? "opacity-60 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.99]"
                    )}
                    style={{ background: "var(--cw-accent)" }}
                  >
                    {submitting ? "Enviando..." : "Enviar Formulário"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center text-xs mt-5 text-muted-foreground">
            © {new Date().getFullYear()} Kontik Business Travel. Todos os direitos reservados.
          </p>
        </div>
      </main>
    </>
  )
}