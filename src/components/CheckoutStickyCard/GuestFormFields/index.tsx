import type { BookingGuestData } from '../../../interfaces/Reservation'
import { maskCPFOrPassport, maskPhone } from '../../../utils/masks'
import { FormGroup } from './styles'

interface GuestFormFieldsProps {
  form: BookingGuestData
  isSubmitting: boolean
  onChangeField: (field: keyof BookingGuestData, value: string) => void
}

export function GuestFormFields({ form, isSubmitting, onChangeField }: GuestFormFieldsProps) {
  return (
    <>
      <FormGroup>
        <label htmlFor="guest-full-name">Nome Completo</label>
        <input
          id="guest-full-name"
          type="text"
          required
          value={form.fullName}
          onChange={(e) => onChangeField('fullName', e.target.value)}
          disabled={isSubmitting}
          data-testid="input-fullname"
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="guest-email">E-mail</label>
        <input
          id="guest-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => onChangeField('email', e.target.value)}
          disabled={isSubmitting}
          data-testid="input-email"
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="guest-document">CPF / Passaporte</label>
        <input
          id="guest-document"
          type="text"
          required
          placeholder="000.000.000-00 ou Passaporte"
          value={form.document}
          onChange={(e) => onChangeField('document', maskCPFOrPassport(e.target.value))}
          disabled={isSubmitting}
          data-testid="input-document"
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="guest-phone">Telefone</label>
        <input
          id="guest-phone"
          type="tel"
          required
          placeholder="(00) 00000-0000"
          value={form.phone}
          onChange={(e) => onChangeField('phone', maskPhone(e.target.value))}
          disabled={isSubmitting}
          data-testid="input-phone"
        />
      </FormGroup>
    </>
  )
}
