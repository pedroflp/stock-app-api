import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1614714783727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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
                    type: 'integer'
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}


