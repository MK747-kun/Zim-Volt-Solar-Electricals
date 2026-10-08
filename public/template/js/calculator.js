// Zim-Volt Solar Load Calculator Engine
window.ZimCalculator = (function () {
  const APPLIANCES = [
    { id: 'lights', name: 'Lights (LEDs)', watts: 90, surge: 1.1 },
    { id: 'wifi', name: 'Wi-Fi Router', watts: 30, surge: 1.0 },
    { id: 'tv', name: 'Decoder / TV', watts: 140, surge: 1.2 },
    { id: 'fridge', name: 'Deep Freezer / Fridge', watts: 250, surge: 4.5 },
    { id: 'borehole', name: 'Borehole Pump (0.75HP - 1.5HP)', watts: 1100, surge: 3.5 },
    { id: 'fence', name: 'Electric Fence / Gate Motor', watts: 85, surge: 2.0 }
  ];

  function calculate(selectedApplianceIds) {
    let continuous = 0;
    let surge = 0;
    const names = [];

    APPLIANCES.forEach((app) => {
      if (selectedApplianceIds.includes(app.id)) {
        continuous += app.watts;
        surge = Math.max(surge, continuous + (app.watts * (app.surge - 1)));
        names.push(app.name);
      }
    });

    let inverter = '1.2kW Hybrid Inverter';
    let battery = '100Ah / 1.2kWh Lithium';
    if (continuous > 3000 || surge > 5500) {
      inverter = '5kW/8kW Sunsynk Hybrid Inverter';
      battery = '5kWh Lithium Battery';
    } else if (continuous > 900 || surge > 2000) {
      inverter = '3.2kW Hybrid Inverter';
      battery = '2.5kWh Lithium Battery';
    }

    return {
      continuous,
      surge: Math.round(surge),
      inverter,
      battery,
      names
    };
  }

  function generateWhatsAppUrl(phone, calcResult) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const loadStr = calcResult.names.length ? calcResult.names.join(', ') : 'Standard home load';
    const msg = `Hi Zim-Volt, I used your calculator. Selected load: ${loadStr}. Recommended setup: ${calcResult.inverter} and ${calcResult.battery}. Please contact me for a site visit.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }

  return {
    APPLIANCES,
    calculate,
    generateWhatsAppUrl
  };
})();
