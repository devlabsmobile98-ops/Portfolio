import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';

const BADGES = [
  { id: 'b1', title: "Dean's List", org: 'Ontario Tech University', year: '2022–2026', color: '#FF6B9D', emoji: '🎓' },
  { id: 'b2', title: 'Electrical, Computer & Software Engineering Capstone', org: '2nd Place Winner', year: '2026', color: '#4D96FF', emoji: '🏆' },
  { id: 'b3', title: "President's Honours List", org: 'Ontario Tech University', year: '2022–2026', color: '#6BCB77', emoji: '🤓' }
];

const SPOTS = {
  'spot-1': { place: '1st', height: 'h-52', medal: '#FFD700', tint: '#FFF6CC', emoji: '🥇' },
};
const VISUAL_ORDER = ['spot-1'];

function fireConfetti(spotId) {
  const colors =
    spotId === 'spot-1'
      ? ['#FFD700', '#FF6B9D', '#4D96FF', '#6BCB77']
      : ['#FFD700', '#FF6B9D', '#4D96FF', '#6BCB77'];
  const count = 140;
  confetti({ particleCount: count, spread: 75, startVelocity: 45, origin: { y: 0.65 }, colors, scalar: 0.9 });
  if (spotId === 'spot-1') {
    setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors }), 150);
  }
}

function BadgeCard({ b, dragging }) {
  return (
    <div
      className="w-60 md:w-72 p-5 rounded-2xl border-2 shadow-lg select-none"
      style={{ background: b.color, borderColor: '#000', color: '#000', opacity: dragging ? 0.85 : 1 }}
    >
      <div className="text-4xl leading-none">{b.emoji}</div>
      <div className="font-black text-lg leading-tight mt-2 uppercase tracking-tight">{b.title}</div>
      <div className="text-sm font-semibold opacity-80 mt-1">{b.org}</div>
      <span className="inline-block mt-3 px-2 py-1 rounded-full bg-black/15 text-xs font-bold">{b.year}</span>
    </div>
  );
}

export default function Awards({ season }) {
  const [placed, setPlaced] = useState({});

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    setPlaced((prev) => {
      const next = { ...prev };
      if (source.droppableId.startsWith('spot-')) delete next[source.droppableId];
      if (destination.droppableId.startsWith('spot-')) next[destination.droppableId] = draggableId;
      return next;
    });

    if (destination.droppableId.startsWith('spot-') && destination.droppableId !== source.droppableId) {
      fireConfetti(destination.droppableId);
    }
  };

  const trayBadges = BADGES.filter((b) => !Object.values(placed).includes(b.id));
  const allPlaced = Object.keys(placed).length === VISUAL_ORDER.length;

  return (
    <section id="awards" className="relative min-h-screen py-24 px-6" aria-label="Awards" style={{ background: '#ffb703', color: '#023047', '--s-bg': '#ffb703', '--s-text': '#023047', '--s-card': '#fff8f0', '--s-accent': '#ff4d6d' }}>
      <div className="flex justify-center">
        <h2
          className="font-black uppercase leading-none"
          style={{ fontSize: '12vw', color: 'var(--s-text)', letterSpacing: '-0.04em' }}
        >
          AWARDS
        </h2>
      </div>

      <p className="text-center text-base md:text-lg font-bold mt-2" style={{ color: 'var(--s-text)' }}>
        Drag the badges onto the podium — gold gets the biggest celebration 🎉
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* podium */}
        <div className="flex items-end justify-center gap-3 md:gap-6 mt-12">
          {VISUAL_ORDER.map((spotId) => {
            const spot = SPOTS[spotId];
            const placedBadge = placed[spotId] ? BADGES.find((b) => b.id === placed[spotId]) : null;
            return (
              <Droppable key={spotId} droppableId={spotId}>
                {(prov, snap) => (
                  <div ref={prov.innerRef} {...prov.droppableProps} className="flex flex-col items-center">
                    {/* badge slot above the block */}
                    <div className="h-52 w-72 flex items-end justify-center">
                      {placedBadge ? (
                        <Draggable draggableId={placedBadge.id} index={0}>
                          {(p, s) => (
                            <div
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              style={p.draggableProps.style}
                            >
                              <BadgeCard b={placedBadge} dragging={s.isDragging} />
                            </div>
                          )}
                        </Draggable>
                      ) : null}
                    </div>

                    <motion.div
                      className={`w-60 md:w-72 ${spot.height} rounded-t-2xl border-2 flex flex-col items-center justify-start pt-5 transition-colors`}
                      style={{
                        background: snap.isDraggingOver ? spot.medal : spot.tint,
                        borderColor: spot.medal,
                        boxShadow: placedBadge ? `0 0 0 3px ${spot.medal}40` : 'none',
                      }}
                      animate={placedBadge ? { rotate: [-1.5, 1.5, -1.5] } : { rotate: 0 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <span className="text-5xl">{spot.emoji}</span>
                      <span className="font-black text-2xl uppercase" style={{ color: '#000' }}>
                        {spot.place}
                      </span>
                      {spotId === 'spot-1' && (
                        <Trophy className="w-7 h-7 mt-2" style={{ color: '#B8860B' }} />
                      )}
                    </motion.div>
                    {prov.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>

        {/* tray */}
        <div className="mt-14">
          <div className="text-center text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--s-text)' }}>
            {allPlaced ? '🎉 Champion selected!' : 'Badge tray — choose your champion!'}
          </div>
          <Droppable droppableId="tray" direction="horizontal">
            {(prov, snap) => (
              <div
                ref={prov.innerRef}
                {...prov.droppableProps}
                className="flex flex-wrap gap-5 justify-center min-h-48 p-6 rounded-2xl border-2 border-dashed"
                style={{
                  borderColor: 'color-mix(in srgb, var(--s-text) 35%, transparent)',
                  background: snap.isDraggingOver
                    ? 'color-mix(in srgb, var(--s-accent) 15%, transparent)'
                    : 'transparent',
                }}
              >
                {trayBadges.length === 0 && (
                  <span className="self-center text-sm font-semibold opacity-50" style={{ color: 'var(--s-text)' }}>
                    Empty — drag a badge off a podium to bring it back
                  </span>
                )}
                {trayBadges.map((b, i) => (
                  <Draggable key={b.id} draggableId={b.id} index={i}>
                    {(p, s) => (
                      <div
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        style={p.draggableProps.style}
                      >
                        <BadgeCard b={b} dragging={s.isDragging} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {prov.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* reset */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPlaced({})}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-transform hover:scale-105"
          style={{ borderColor: 'var(--s-text)', color: 'var(--s-text)', background: 'var(--s-card)' }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset podium
        </button>
      </div>
    </section>
  );
}
