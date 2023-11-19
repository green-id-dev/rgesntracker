import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum CriteriaState {
    'IN_PROGRESS',
    'APPROVED',
    'REJECTED',
    "NOT_APPLICABLE"

}


export class Criteria {
    id: number;
    state: CriteriaState;

}


@Entity()
export class Audit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tokenJwt: string;
    @Column()
    token: string;
    @Column('json' , {nullable: true})
    criteria: Criteria[];
    @Column()
    url: string;
    @Column()
    siteName: string;
    @Column()
    structureName: string;
    @Column()
    nameAuditor: string;
    @Column()
    emailAuditor: string;
    @Column()
    renderEmail: boolean;
    @UpdateDateColumn()
    updatedAt: Date;


}