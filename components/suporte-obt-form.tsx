"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { CheckCircle2, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { KontikLogo } from "./kontik-logo"
import { SearchableSelect } from "./searchable-select"
import { FormField } from "./form-field"
import { SectionDivider } from "./section-divider"


const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL_SUPORTE_OBT ?? "https://YOUR_WEBHOOK_URL_HERE"

// ─── Option lists ──────────────────────────────────────────────────────────
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

// ─── Types ─────────────────────────────────────────────────────────────────
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

// ─── Shared input styles ───────────────────────────────────────────────────
const inputBase =
  "w-full px-3 py-2.5 text-sm rounded-[6px] border outline-none transition-all focus:ring-2 focus:ring-offset-0 " +
  "border-[#404653] bg-white text-[#404653] placeholder:text-[#9aa0ad] " +
  "focus:ring-[#C2D82F]/50 focus:border-[#C2D82F] " +
  "dark:border-[#343840] dark:bg-[#22252c] dark:text-[#e2e4ec] dark:placeholder:text-[#515966] " +
  "dark:focus:ring-[#6c9ad7]/50 dark:focus:border-[#6c9ad7]"
const inputError = "border-red-500 focus:ring-red-200 dark:border-red-400"

function NativeSelect({
  options,
  value,
  onChange,
  id,
  error,
  required,
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
          !value && "text-[#9aa0ad]",
          error && inputError
        )}
        style={{ color: value ? "var(--input-text)" : "var(--input-ph)" }}
      >
        <option value="" disabled>Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="#404653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function SuporteObtForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.grupoEmpresa) e.grupoEmpresa = "Campo obrigatório"
    if (!form.sistema) e.sistema = "Campo obrigatório"
    if (!form.categoriaSuporteObt) e.categoriaSuporteObt = "Campo obrigatório"
    if (!form.filaAtendimento) e.filaAtendimento = "Campo obrigatório"
    return e
  }

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
      setSuccess(true)
      setForm(INITIAL_STATE)
    } catch {
      setSubmitError("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--page-bg)" }}>
        <div className="rounded-xl shadow-sm p-12 text-center max-w-md w-full border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
          <CheckCircle2 size={52} className="mx-auto mb-4" style={{ color: "#C2D82F" }} />
          <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Formulário enviado com sucesso!
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            O ticket de Suporte OBT foi registrado.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm font-medium underline"
            style={{ color: "var(--text-primary)" }}
          >
            Preencher novo formulário
          </button>
        </div>
      </div>
    )
  }

  return (
    <main
      className="min-h-screen py-10 px-4 font-sans"
      style={{ background: "#f4f5f3" }}
    >
      <div className="mx-auto w-full max-w-[720px]">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header bar */}
          <div className="h-1.5 w-full" style={{ background: "#C2D82F" }} />

          <div className="px-8 pt-8 pb-10 sm:px-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <KontikLogo />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1
                className="text-xl font-bold tracking-tight text-balance"
                style={{ color: "var(--text-primary)" }}
              >
                Suporte OBT
              </h1>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#9aa0ad" }}>
                Preencha todos os campos obrigatórios antes de finalizar o atendimento
              </p>
              <p className="text-xs mt-2" style={{ color: "#9aa0ad" }}>
                Campos marcados com{" "}
                <span style={{ color: "#E31F26" }}>*</span> são obrigatórios
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* ── Seção: Identificação ──────────────────────────────────── */}
              <SectionDivider title="Identificação" />

              {/* 1. Tipo */}
              <FormField label="Tipo" htmlFor="tipo">
                <NativeSelect
                  id="tipo"
                  options={TIPOS}
                  value={form.tipo}
                  onChange={(v) => set("tipo", v)}
                />
              </FormField>

              {/* 2. Grupo Empresa */}
              <FormField
                label="Grupo Empresa"
                required
                error={errors.grupoEmpresa}
                htmlFor="grupoEmpresa"
              >
                <SearchableSelect
                  id="grupoEmpresa"
                  options={GRUPOS_EMPRESA}
                  value={form.grupoEmpresa}
                  onChange={(v) => {
                    setForm((prev) => ({ ...prev, grupoEmpresa: v }))
                    setErrors((prev) => ({ ...prev, grupoEmpresa: undefined }))
                  }}
                  error={errors.grupoEmpresa}
                  required
                />
              </FormField>

              {/* 3. Sistema */}
              <FormField
                label="Sistema"
                required
                error={errors.sistema}
                htmlFor="sistema"
              >
                <NativeSelect
                  id="sistema"
                  options={SISTEMAS}
                  value={form.sistema}
                  onChange={(v) => set("sistema", v)}
                  error={errors.sistema}
                  required
                />
              </FormField>

              {/* ── Seção: Classificação ──────────────────────────────────── */}
              <SectionDivider title="Classificação" />

              {/* 4. Categoria Suporte OBT */}
              <FormField
                label="Categoria Suporte OBT"
                required
                error={errors.categoriaSuporteObt}
                htmlFor="categoriaSuporteObt"
              >
                <NativeSelect
                  id="categoriaSuporteObt"
                  options={CATEGORIAS_SUPORTE_OBT}
                  value={form.categoriaSuporteObt}
                  onChange={(v) => set("categoriaSuporteObt", v)}
                  error={errors.categoriaSuporteObt}
                  required
                />
              </FormField>

              {/* 5. Serviço */}
              <FormField label="Serviço" htmlFor="servico">
                <NativeSelect
                  id="servico"
                  options={SERVICOS}
                  value={form.servico}
                  onChange={(v) => set("servico", v)}
                />
              </FormField>

              {/* 7. Prioridade */}
              <FormField label="Prioridade" htmlFor="prioridade">
                <NativeSelect
                  id="prioridade"
                  options={PRIORIDADES}
                  value={form.prioridade}
                  onChange={(v) => set("prioridade", v)}
                />
              </FormField>

              {/* ── Seção: Detalhes ───────────────────────────────────────── */}
              <SectionDivider title="Detalhes" />

              {/* 6. Observações */}
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

              {/* ── Seção: Fila ───────────────────────────────────────────── */}
              <SectionDivider title="Fila" />

              {/* 8. Fila de Atendimento Suporte OBT */}
              <FormField
                label="Fila de Atendimento Suporte OBT"
                required
                error={errors.filaAtendimento}
                htmlFor="filaAtendimento"
              >
                <NativeSelect
                  id="filaAtendimento"
                  options={FILAS_ATENDIMENTO}
                  value={form.filaAtendimento}
                  onChange={(v) => set("filaAtendimento", v)}
                  error={errors.filaAtendimento}
                  required
                />
              </FormField>

              {/* ── Submit error ─────────────────────────────────────────── */}
              {submitError && (
                <p
                  className="text-sm font-medium text-center py-2 px-3 rounded-[6px] bg-red-50"
                  style={{ color: "#E31F26" }}
                  role="alert"
                >
                  {submitError}
                </p>
              )}

              {/* ── Submit button ─────────────────────────────────────────── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "w-full py-3 rounded-[6px] text-sm font-semibold tracking-wide transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C2D82F]",
                    submitting
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:brightness-95 active:scale-[0.99]"
                  )}
                  style={{
                    background: "#C2D82F",
                    color: "#404653",
                  }}
                >
                  {submitting ? "Enviando..." : "Enviar Formulário"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-5" style={{ color: "#b0b5be" }}>
          © {new Date().getFullYear()} Kontik Business Travel. Todos os direitos reservados.
        </p>
      </div>
    </main>
  )
}
