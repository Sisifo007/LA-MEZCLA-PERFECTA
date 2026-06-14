import { login } from './actions'
import { Martini } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mb-4 border border-[var(--color-gold)]/20 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
            <Martini className="w-8 h-8 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-center text-3xl font-bold font-display text-[var(--color-gold)] tracking-wide">
            Lumen Restobar
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Inicia sesión en tu panel de administración
          </p>
        </div>

        <form className="mt-8 space-y-6 card" action={login}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          {params?.error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
              Credenciales incorrectas. Por favor, intenta de nuevo.
            </div>
          )}

          <div>
            <button
              type="submit"
              className="btn-primary w-full flex justify-center py-2.5"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
