import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createClasses1626447269155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'classrooms',
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
            name: 'teacherId',
            type: 'integer',
          },
          {
            name: 'schoolId',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ClassTeacher',
            columnNames: ['teacherId'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'ClassSchool',
            columnNames: ['schoolId'],
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('classrooms');
    }

}
