import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bcdSchema = new Schema({
  number: { type: 'Number', index: { unique: true } },
  brand: { type: 'String', required: true },
  model: { type: 'String', required: true },
  size: { type: 'String', enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
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

bcdSchema.statics.numberExist = function (number) {
  return new Promise((resolve, reject) => {
    this.findOne({ number }, (err, bcd) => {
      if (err) throw err;
      if (bcd) {
        resolve(bcd);
      } else {
        reject(`${number} don't exists`);
      }
    });
  });
};

export default mongoose.model('Bcd', bcdSchema);
