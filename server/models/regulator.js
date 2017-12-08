import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const regulatorSchema = new Schema({
  number: { type: 'Number', required: true, index: { unique: true } },
  brand: { type: 'String', required: true },
  description: { type: 'String', required: true },
  model: { type: 'String', required: true },
  usage: { type: 'String', required: true, default: 'Air', enum: ['Air', 'Nitrox', 'O2'] },
  serialNumber: {
    stage1: { type: 'String', required: true },
    stage2: { type: 'String', required: true },
    stageOcto: { type: 'String', required: true }
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
}, {
  timestamps: true
});

regulatorSchema.statics.numberExist = function (number) {
  return new Promise((resolve, reject) => {
    this.findOne({ number }, (err, regulator) => {
      if (err) throw err;
      if (regulator) {
        resolve(regulator);
      } else {
        reject(`${number} don't exists`);
      }
    });
  });
};

export default mongoose.model('Regulator', regulatorSchema);
