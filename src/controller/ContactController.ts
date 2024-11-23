import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/Contact";
import { validate } from "class-validator";


export class ContactController{
    static create = async(req: Request, res: Response)=>{
        const contactRepo = AppDataSource.getRepository(Contact);

        try {
            const{Id, Name, LastName, Phone, Email, Address} = req.body;

            let contact = await contactRepo.findOne({where:{Id}});
            if(contact){
                return res.status(400).json({message:"El contacto ya existe en la base de datos"});
            }
            
            contact = new Contact();

            contact.Id = Id;
            contact.Name = Name;
            contact.LastName = LastName;
            contact.Phone = Phone;
            contact.Email = Email;
            contact.Address = Address;

            const validateOpt= {ValidationError:{target:false, value:false}};
            const errors= await validate(contact,{validationError:{target:false, value:false}});

            if(errors.length>0){
                return res.status(400).json(errors);
            }
            
            await contactRepo.save(contact);
        } catch (error) {
            return res.status(400).json({message:"Error al guardar."})
        }return res.status(200).json("Contacto guardado correctamente.");
    }

    static getAll = async(req: Request, res: Response)=>{
        try {
            const contactRepo = AppDataSource.getRepository(Contact);
            const contactList = await contactRepo.find();

            if((contactList).length == 0) {
                return res.status(404).json({message: "No hay datos registrados"});
            } return res.status(200).json(contactList)
        } catch (error) {
            return res.status(404).json({message: "Error al acceder a la base de datos"});
        }
    }

    static getOne = async(req: Request, res: Response)=>{
        try {
            const Id = req.params['Id'];

            if (!Id){
                return res.status(400).json({message: "Debe indicar el Id"});
            }

            const contactRepo = AppDataSource.getRepository(Contact);

            try {
                const contact = await contactRepo.findOneOrFail({where:{Id}});
                return res.status(200).json(contact);
            } catch (error) {
                return res.status(404).json({message: `No existe el contacto con el id ${Id}`});
            }
        } catch (error) {
            return res.status(404).json({message: "Error al acceder a la base de datos"});
        }
    }

    static update= async(req: Request, res:Response)=>{
        try {
            const contactRepo = AppDataSource.getRepository(Contact);
            const Id = req.params['Id'];
            const{Name, LastName, Phone, Email, Address} = req.body;

            let contact;

            try {
                contact = await contactRepo.findOneOrFail({where:{Id}});
            } catch (error) {
                return res.status(404).json({message:"El producto con el ID indcado no existe en el base de datos."})
            }

            contact.Name = Name;
            contact.LastName = LastName;
            contact.Phone = Phone;
            contact.Email = Email;
            contact.Address = Address;

            const errors= await validate(contact,{validationError:{target:false, value:false}});

            await contactRepo.save(contact);

            return res.status(200).json({message:"El contacto ha sido modificado."});
        } catch (error) {
            return res.status(404).json({message:"Error al modificar el contacto."})
        }
    }

    static delete = async(req: Request, res: Response)=>{
        try {
            const Id = req.params['Id'];

            if(!Id){
                return res.status(400).json({message:"Debe indicar el Id"})
            }
            
            const contactRepo = AppDataSource.getRepository(Contact);

            let contact;

            try {
                contact = await contactRepo.findOneOrFail({where: {Id}});
            } catch (error) {
                return res.status(404).json({message:"El contacto con el ID indcado no existe en el base de datos."})
            }

            await contactRepo.delete(contact);
            return res.status(200).json({message:"El contacto ha sido eliminado."});
        } catch (error) {
            return res.status(404).json({message:"Error al eliminar el contacto."})
        }
    }
} 