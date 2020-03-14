module.exports = (options) => {
    let moduleSchema=require(`../mongodb/module/${options.module}Module`)
    return async (req, res, next) => {
        let token = String(req.headers.authorization || '').split(' ').pop()
        if(!token)return res.status(401).send({msg:'您的登录信息有误，请重新登录！'})
        let {id,exp}=options.jwt.verify(token,req.app.get('key'))
        if(exp<new Date().getTime())return res.status(402).send({msg:'您的登录信息已过期，请重新登录！'})
        if(!id)return res.status(401).send({msg:'您的登录信息有误，请重新登录！'})
        req.uesr=await moduleSchema.findById(id)
        if(!req.uesr)return res.status(401).send({msg:'您的登录信息有误，请重新登录！'})
         await next()
    }
}