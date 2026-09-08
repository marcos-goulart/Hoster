import { serviceIcons, serviceLabels } from '../../constants/services'
import { ServicesList } from './styles'

interface ServicesFilterBlockProps {
  selectedServices: string[]
  onToggleService: (serviceKey: string) => void
}

export function ServicesFilterBlock({
  selectedServices,
  onToggleService,
}: ServicesFilterBlockProps) {
  return (
    <div className="filterBlock">
      <h3>Serviços</h3>
      <ServicesList>
        {Object.entries(serviceLabels).map(([key, label]) => (
          <label key={key}>
            <input
              type="checkbox"
              value={key}
              checked={selectedServices.includes(key)}
              onChange={() => onToggleService(key)}
            />
            {serviceIcons[key]}
            {label}
          </label>
        ))}
      </ServicesList>
    </div>
  )
}
