import { Request, Response } from "express";
import { DbManager } from "../../utils/DbManager";
const prisma = DbManager.getInstance().getClient()

export const handleGetWebtoons= async (req: Request, res: Response)=>{
    try{
        let {page, take} = req.query

        const p = page ?  Number.parseInt(page?.toString()) : 1;
        const t = take ? Number.parseInt(take?.toString()) : 10;

        const webtoons = await prisma.webtoon.findMany({
            skip: (p-1)*t,
            take: t 
        })
        return res.status(200).json({
            "webtoons": webtoons
        })

    }
    catch(err){
        console.log(err)
        return res.status(400).json({"msg":"Internal Server Error"})
    }
}
export const handleGetWebtoon= async (req: Request, res: Response)=>{
    try{
        let {id} = req.params
        if(!id){
            return res.status(400).json({
                "msg":"Id not found"
            })
        }


        const webtoon= await prisma.webtoon.findFirst({
            where:{
                id
            }
        })
        if(!webtoon){
            
            return res.status(400).json({
                "msg":"No webtoon Found",
                "webtoon":null
            })
        }
        return res.status(200).json({
            "webtoon":webtoon
        })

    }
    catch(err){
        console.log(err)
        return res.status(400).json({"msg":"Internal Server Error"})
    }
}
export const handleCreateWebtoon= async (req: Request, res: Response)=>{
    try{
        let {
            title, 
            content, 
            images
        }= req.body
        
        if(!title || !content ){
            return res.status(400).json({
                "msg":"All fields not provided"
            })
        }

        if(!req.body.user.role.includes("ADMIN")){
            res.status(403).json({
                "msg":"unauthorised"
            })
        }

        await prisma.webtoon.create({
            data:{
                title, 
                content, 
                images,
                published: true, 
                author:{
                    connect:{
                        id : req.body.user.id
                    }
                }
            }
        })


        res.status(200).json({
            "msg":"Created Successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({"msg":"Internal Server Error"})
    }
}
export const handleDeleteWebtoon= async (req: Request, res: Response)=>{
    try{
        let { id}= req.params
        
        if(!id){
            return res.status(400).json({
                "msg":"Id not Found"
            })
        }

        if(!req.body.user.role.includes("ADMIN")){
            res.status(403).json({
                "msg":"unauthorised"
            })
        }
        let existingwebtoon = await prisma.webtoon.findFirst({
            where:{
                id: id
            }
        })

        if(!existingwebtoon){
            return res.status(400).json({
                "msg":"Webtoon not found"
            })
        }
        await prisma.webtoon.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({
            "msg":"Deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({"msg":"Internal Server Error"})
    }
}