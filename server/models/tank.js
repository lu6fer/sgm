import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tankSchema = new Schema({
  number: { type: 'Number', required: true, index: { unique: true } },
  cylinder: {
    brand: { type: 'String', required: true },
    maker: { type: 'String', required: true },
    model: { type: 'String', required: true },
    size: { type: 'String', required: true },
    serialNumber: { type: 'String', required: true },
    threadType: { type: 'String', required: true },
    pressure: {
      operating: { type: 'Number', required: true },
      test: { type: 'Number', required: true },
    }
  },
  valve: {
    model: { type: 'String' },
    brand: { type: 'String', required: true },
    serialNumber: { type: 'String', required: true }
  },
  buy: {
    shop: { type: 'String' },
    price: { type: 'Number' },
    date: { type: 'Date' }
  },
  status: { type: 'String', required: true, default: 'En Service', enum: [
    'En service', 'Réformé', 'Vendu',
    'Perdu', 'Disparu', 'Echangé',
    'Mis en vente', 'Résilié'
  ] },
  usage: { type: 'String', enum: ['Air', 'Nitrox', 'O2'], default: 'Air' }
}, {
  timestamps: true
});


tankSchema.statics.numberExist = function (number) {
  return new Promise((resolve, reject) => {
    this.findOne({ number }, (err, tank) => {
      if (err) throw err;
      if (tank) {
        resolve(tank);
      } else {
        reject(`${number} don't exists`);
      }
    });
  });
};


export default mongoose.model('Tank', tankSchema);
