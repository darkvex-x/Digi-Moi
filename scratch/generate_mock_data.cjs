const fs = require('fs');
const path = require('path');

const eventTypes = [
  { name: 'Wedding & Reception', brides: ['Anitha', 'Priya', 'Kavitha', 'Sangeetha', 'Divya', 'Deepa'], grooms: ['Ramesh', 'Suresh', 'Karthik', 'Arjun', 'Vijay', 'Saravanan'] },
  { name: 'Grahapravesam (House Warming)', brides: [], grooms: ['Subramanian', 'Muthu', 'Elango', 'Manikandan', 'Venkatesh'] },
  { name: 'Baby Shower (Valaikappu)', brides: ['Keerthana', 'Janani', 'Sindhu', 'Meera'], grooms: [] },
  { name: 'Ear Piercing Ceremony', brides: [], grooms: ['Thangavel Family', 'Selvam Family', 'Murugan Family'] }
];

const venues = [
  'Grand Palace Mandapam, Chennai',
  'Sri Meenakshi Mahal, Madurai',
  'Codissia Hall, Coimbatore',
  'Kalyana Mandapam, Trichy',
  'Vasantha Mahal, Salem',
  'Abirami Hall, Tirunelveli',
  'Golden Jubilee Hall, Erode',
  'Annapoorna Mandapam, Vellore'
];

const guestFirstNames = [
  'Raja', 'Anbarasan', 'Elavarasan', 'Chitra', 'Devi', 'Ganesan', 'Hari', 'Indira', 'Jayakumar',
  'Kalaiyarasan', 'Loganathan', 'Manoj', 'Narmadha', 'Omprakash', 'Parthiban', 'Radha', 'Senthil',
  'Thirumavalavan', 'Usha', 'Vignesh', 'Yuvraj', 'Balaji', 'Chandran', 'Dinesh', 'Eswaran', 'Ganga'
];

const guestLastNames = [
  'Kumar', 'Rajan', 'Sekar', 'Selvan', 'Dharan', 'Mani', 'Murugan', 'Vel', 'Nathan', 'Subbu',
  'Babu', 'Prasad', 'Naidu', 'Pillai', 'Iyer', 'Reddy', 'Gounder', 'Thevar', 'Achari'
];

const paymentMethods = ['Cash', 'UPI', 'Card', 'Cheque', 'Bank Transfer'];

const generateMockData = () => {
  const events = [];
  const entries = [];
  
  // Create 15 Events
  for (let i = 1; i <= 15; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    let eventName = '';
    let brideName = '';
    let groomName = '';
    
    if (type.brides.length > 0 && type.grooms.length > 0) {
      brideName = type.brides[Math.floor(Math.random() * type.brides.length)];
      groomName = type.grooms[Math.floor(Math.random() * type.grooms.length)];
      eventName = `${groomName} & ${brideName} ${type.name}`;
    } else if (type.brides.length > 0) {
      brideName = type.brides[Math.floor(Math.random() * type.brides.length)];
      eventName = `${brideName}'s ${type.name}`;
    } else {
      groomName = type.grooms[Math.floor(Math.random() * type.grooms.length)];
      eventName = `${groomName}'s ${type.name}`;
    }

    const eventId = `evt_mock_${i}`;
    const functionDate = new Date(Date.now() - (15 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const event = {
      id: eventId,
      eventName,
      brideName,
      groomName,
      venue,
      functionDate,
      notes: `Automated mock event ledger ${i} for scale verification.`,
      totalAmount: 0,
      totalEntries: 0,
      createdAt: new Date(Date.now() - (15 - i) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - (15 - i) * 24 * 60 * 60 * 1000).toISOString()
    };

    // Add between 20 to 45 entries per event (Total ~ 450 entries)
    const entryCount = 20 + Math.floor(Math.random() * 25);
    let eventAmountSum = 0;

    for (let j = 1; j <= entryCount; j++) {
      const gFirst = guestFirstNames[Math.floor(Math.random() * guestFirstNames.length)];
      const gLast = guestLastNames[Math.floor(Math.random() * guestLastNames.length)];
      const name = `${gFirst} ${gLast}`;
      
      // Standard contribution denominations in India: 101, 251, 501, 1001, 2001, 5001, 10001
      const amounts = [101, 251, 501, 1001, 2001, 5001, 10001, 100, 500, 1000, 2000, 5000];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const receiptNumber = String(j).padStart(3, '0');
      
      const entryTime = `${String(9 + Math.floor(Math.random() * 10)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
      
      const entry = {
        id: `ent_mock_${i}_${j}`,
        eventId,
        receiptNumber,
        name,
        amount,
        paymentMethod,
        date: functionDate,
        time: entryTime,
        createdAt: new Date(new Date(event.createdAt).getTime() + j * 5 * 60 * 1000).toISOString()
      };
      
      entries.push(entry);
      eventAmountSum += amount;
    }

    event.totalAmount = eventAmountSum;
    event.totalEntries = entryCount;
    events.push(event);
  }

  const payload = {
    settings: {
      businessName: 'Happy Pocket Banquets',
      receiptPrefix: 'Moi-',
      currency: '₹',
      paperWidth: '58mm',
      theme: 'light'
    },
    events,
    entries
  };

  return payload;
};

const mockData = generateMockData();
const outPath = path.join(__dirname, '..', 'docs', 'mock_scale_backup.json');

fs.writeFileSync(outPath, JSON.stringify(mockData, null, 2), 'utf-8');
console.log(`Generated ${mockData.events.length} events and ${mockData.entries.length} guest entries successfully!`);
console.log(`Saved to: ${outPath}`);
