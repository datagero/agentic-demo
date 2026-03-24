import { useState } from 'react'
import { portStops, itineraryDays } from '../data/mock'

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [view, setView] = useState<'timeline' | 'ports'>('timeline')

  const dayData = itineraryDays.find((d) => d.day === selectedDay)

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full">
      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-4">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Eastern Caribbean
        </p>
        <h1 className="text-2xl font-display font-semibold">Itinerary</h1>
        <p className="text-gray-300 text-sm mt-1">Caribbean Princess · 8 days</p>

        {/* View toggle */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setView('timeline')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              view === 'timeline'
                ? 'bg-pcl-gold text-pcl-navy'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Daily Plan
          </button>
          <button
            onClick={() => setView('ports')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              view === 'ports'
                ? 'bg-pcl-gold text-pcl-navy'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All Ports
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <>
          {/* Day selector */}
          <div className="bg-white border-b border-gray-100 px-2 py-2">
            <div className="flex gap-1 overflow-x-auto">
              {portStops.map((stop) => (
                <button
                  key={stop.day}
                  onClick={() => setSelectedDay(stop.day)}
                  className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-colors ${
                    selectedDay === stop.day
                      ? 'bg-pcl-navy text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[10px] font-medium">Day {stop.day}</span>
                  <span className="text-xs font-semibold mt-0.5">{stop.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Day details */}
          {dayData ? (
            <div className="px-4 py-4">
              {/* Weather + location */}
              <div className="card p-3 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">{dayData.weather.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-pcl-text">{dayData.port}</p>
                    <p className="text-xs text-gray-400">
                      {dayData.isSeaDay ? 'Sea Day' : 'Port Day'} · {dayData.weather.temp}°F
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-blue-50 text-pcl-navy font-semibold rounded-full px-2 py-0.5">
                  {dayData.weather.condition}
                </span>
              </div>

              {/* Activities timeline */}
              <p className="section-label px-0">Activities</p>
              <div className="space-y-1">
                {dayData.activities.map((act, idx) => (
                  <div key={act.id} className="flex gap-3">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center w-10 shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                        act.aiRecommended ? 'bg-pcl-gold' : 'bg-pcl-navy'
                      }`} />
                      {idx < dayData.activities.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-0.5" />
                      )}
                    </div>

                    {/* Activity card */}
                    <div className="card flex-1 p-3 mb-2">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-400 font-medium">{act.time}</p>
                          <p className="font-semibold text-sm text-pcl-text mt-0.5">{act.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{act.location}</p>
                          {act.description && (
                            <p className="text-xs text-gray-500 mt-1">{act.description}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                          {act.aiRecommended && (
                            <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold rounded-full px-2 py-0.5">
                              AI Pick
                            </span>
                          )}
                          {act.medallionPersonalized && (
                            <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold rounded-full px-2 py-0.5">
                              For You
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <span className="text-3xl block mb-2" aria-hidden="true">📅</span>
                <p className="text-sm text-gray-500">
                  Select a day to view your personalized schedule
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Ports list view */
        <div className="px-4 py-4 space-y-2">
          {portStops.map((stop) => (
            <button
              key={stop.day}
              onClick={() => { setSelectedDay(stop.day); setView('timeline') }}
              className="card w-full flex items-center gap-4 p-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-2xl shrink-0" aria-hidden="true">{stop.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-pcl-text truncate">{stop.port}</p>
                <p className="text-xs text-gray-400">{stop.type}</p>
                {(stop.arrivalTime || stop.departureTime) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {stop.arrivalTime && `Arrive ${stop.arrivalTime}`}
                    {stop.arrivalTime && stop.departureTime && ' · '}
                    {stop.departureTime && `Depart ${stop.departureTime}`}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-pcl-navy">Day {stop.day}</p>
                <p className="text-xs text-gray-400">{stop.date}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
