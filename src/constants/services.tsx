import type { ReactElement } from 'react'
import { FaCoffee, FaFutbol, FaParking, FaUmbrellaBeach, FaUtensils, FaWifi } from 'react-icons/fa'
import { MdPool } from 'react-icons/md'

export const serviceLabels: Record<string, string> = {
  restaurante: 'Restaurante',
  piscina: 'Piscinas',
  wifi: 'Wi-fi',
  'cafe-manha': 'Café da manhã',
  'campo-futebol': 'Campo de futebol',
  estacionamento: 'Estacionamento',
  praias: 'Praias',
}

export const serviceIcons: Record<string, ReactElement> = {
  restaurante: <FaUtensils aria-hidden="true" />,
  piscina: <MdPool aria-hidden="true" />,
  wifi: <FaWifi aria-hidden="true" />,
  'cafe-manha': <FaCoffee aria-hidden="true" />,
  'campo-futebol': <FaFutbol aria-hidden="true" />,
  estacionamento: <FaParking aria-hidden="true" />,
  praias: <FaUmbrellaBeach aria-hidden="true" />,
}
