import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().nonempty('O email é obrigatório.').email('Insira um email válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(8, 'A senha deve ter pelo menos 8 carcteres'),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('O nome completo é obrigatório.')
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().nonempty('O email é obrigatório.').email('Insira um email válido.'),
    password: z
      .string()
      .nonempty('a senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 carcteres')
      .regex(/[a-z]/, 'Deve ter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string().nonempty('A confirmação de senha é obrigatória.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
