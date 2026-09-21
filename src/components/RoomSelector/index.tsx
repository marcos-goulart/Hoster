import type { RoomOption } from '../../interfaces/Reservation'
import { RoomOptionLabel, RoomOptionsList, SectionTitle } from './styles'

export interface RoomSelectorProps {
  rooms: RoomOption[]
  selectedRoomId: string
  onSelectRoom: (room: RoomOption) => void
}

export function RoomSelector({ rooms, selectedRoomId, onSelectRoom }: RoomSelectorProps) {
  if (!rooms || rooms.length === 0) return null

  return (
    <section aria-labelledby="room-selection-title">
      <SectionTitle id="room-selection-title">Escolha o seu Quarto</SectionTitle>
      <RoomOptionsList role="radiogroup" aria-labelledby="room-selection-title">
        {rooms.map((room) => {
          const isSelected = room.id === selectedRoomId

          return (
            <RoomOptionLabel
              key={room.id}
              $selected={isSelected}
              htmlFor={`room-input-${room.id}`}
              data-testid={`room-option-${room.id}`}
            >
              <div className="room-info">
                <input
                  type="radio"
                  id={`room-input-${room.id}`}
                  name="selectedRoom"
                  checked={isSelected}
                  onChange={() => onSelectRoom(room)}
                  data-testid={`room-radio-${room.id}`}
                />
                <div className="room-details">
                  <strong>{room.title}</strong>
                  <p>{room.subtitle}</p>
                  <div className="room-tags">
                    {room.tags.map((tag, tagIdx) => (
                      <span key={`tag-${tagIdx}`} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="room-price">
                <span>
                  {room.pricePerNight.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <small>/noite</small>
              </div>
            </RoomOptionLabel>
          )
        })}
      </RoomOptionsList>
    </section>
  )
}
