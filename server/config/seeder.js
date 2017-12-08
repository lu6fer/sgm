import UserSeeder from '../models/user.seeder';
import TankSeeder from '../models/tank.seeder';

module.exports = function () {
    UserSeeder();
    TankSeeder();
};