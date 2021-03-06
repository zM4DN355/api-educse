import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStudents1626453871840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },         
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'is_verified',
            type: 'boolean',
          },
        ],
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('students');
    }

}
