import User from './user';

export default function () {
    User.findOne({email: 'admin@subalcatel.net'}).exec((err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            const admin = new User();

            admin.email = 'admin@subalcatel.net';
            admin.slug = 'admin';
            admin.lastName = 'admin';
            admin.firstName = 'admin';
            admin.role = 'admin';
            admin.password = 'admin';
            admin.membership = [
                'regulator',
                'bcd',
                'tank'
            ];

            User.create([admin], (createErr) => {
                if (createErr) {
                    throw createErr;
                }
                console.log(`Admin user creatated - ${admin.email}/admin`); // eslint-disable-line no-console
            });
        }
    });
}