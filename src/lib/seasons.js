// Seasonal theme engine — picks a season by Toronto/Ontario date
// Mar–May = Spring, Jun–Aug = Summer, Sep–Nov = Fall, Dec–Feb = Winter
// All seasons draw from the brand palette:
//   navy #023047 · pink #ff4d6d · yellow #ffb703 · sky #8ecae6 · cyan #00d6e3

export const SEASONS = {
  spring: {
    name: 'Spring',
    bg: '#8ecae6',
    text: '#023047',
    accent: '#ff4d6d',
    accent2: '#ffb703',
    card: '#a8d5ec',
    radius: '2rem',
    motion: { bounce: 0.6, duration: 0.7 },
  },
  summer: {
    name: 'Summer',
    bg: '#023047',
    text: '#fff8f0',
    accent: '#ffb703',
    accent2: '#ff4d6d',
    card: '#012a3f',
    radius: '0px',
    motion: { bounce: 0.2, duration: 0.25 },
  },
  fall: {
    name: 'Fall',
    bg: '#023047',
    text: '#ffb703',
    accent: '#ff4d6d',
    accent2: '#00d6e3',
    card: '#012a3f',
    radius: '0.5rem',
    motion: { bounce: 0.3, duration: 0.5 },
  },
  winter: {
    name: 'Winter',
    bg: '#012a3f',
    text: '#8ecae6',
    accent: '#ff4d6d',
    accent2: '#ffb703',
    card: '#023047',
    radius: '1rem',
    motion: { bounce: 0.4, duration: 0.6 },
  },
};

export function getSeason(date = new Date()) {
  const m = date.getMonth(); // 0–11
  if (m >= 2 && m <= 4) return 'spring';   // Mar–May
  if (m >= 5 && m <= 7) return 'summer';   // Jun–Aug
  if (m >= 8 && m <= 10) return 'fall';    // Sep–Nov
  return 'winter';                          // Dec–Feb
}