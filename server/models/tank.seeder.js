import Tank from './tank';

export default function () {
    Tank.findOne({ number: '1' }).exec((err, tank) => {
        if (err) {
            throw err;
        }

        if (!tank) {
            const newTank = {
                number: 1,
                cylinder: {
                    brand: 'Beuchat',
                    model: 'Mono',
                    size: '12l',
                    maker: 'Faber',
                    threadType: '25x200 6H ISO',
                    serialNumber: 'B9154',
                    pressure: {
                        operating: '230',
                        test: '300'
                    }
                },
                valve: {
                    brand: 'Aqualung',
                    model: 'T-A-G 300B',
                    serialNumber: 'M2562'
                },
                buy: {
                    shop: 'Saint-Brieuc Plongée',
                    price: '281.9',
                    date: new Date()
                },
                status: 'En service'
            };

            Tank.create([newTank], (createErr) => {
                if (createErr) {
                    throw createErr;
                }
                console.log(`Tank ${newTank.cylinder.brand}-${newTank.cylinder.model}(${newTank.number}) created`); // eslint-disable-line no-console
            });
        }
    });
}