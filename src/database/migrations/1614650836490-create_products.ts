import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1614650836490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
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
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
