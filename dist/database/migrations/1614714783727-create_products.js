"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducts1614714783727 = void 0;
const typeorm_1 = require("typeorm");
class createProducts1614714783727 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    isUnique: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'quantity',
                    type: 'number'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 2
                },
                {
                    name: 'updated',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'user_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'ProductUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}
exports.createProducts1614714783727 = createProducts1614714783727;
