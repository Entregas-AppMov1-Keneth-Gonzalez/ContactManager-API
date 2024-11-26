import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryColumn()
    @IsNotEmpty({message:'Debe indicar el ID.'})  
    Id: string;

    @Column()
    @IsNotEmpty({message:'Debe indicar el nombre.'})
    Name: string;

    @Column()
    @IsNotEmpty({message:'Debe indicar el apellido.'})
    LastName: string;

    @Column()
    @IsNotEmpty({message:'Debe indicar el telefono.'})
    Phone: Number;

    @Column()
    @IsNotEmpty({message:'Debe indicar el correo electronico.'})
    Email: string;   
    
    @Column()
    @IsNotEmpty({message:'Debe indicar la direccion.'})
    Address: string; 

    @Column()
    FullName: string;
} 
