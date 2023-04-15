function replacetemplate(template,data){
    let output = template.replace(/{IMAGE}/g,data.image)
        output = output.replace(/{PRODUCTNAME}/g,data.productName)
        output = output.replace(/{PRODUCTQUANTITY}/g,data.quantity)
        output = output.replace(/{PRODUCTPRICE}/g,data.price)
        output = output.replace(/{PRODUCTFROM}/g,data.from)
        output = output.replace(/{PRODUCTDESCRIPTION}/g,data.description)
        output = output.replace(/{PRODUCTNUTRIENTS}/g,data.nutrients)
        output = output.replace(/{ID}/g,data.id)
        if(!data.organic) {
            output = output.replace(/{NOTORGANIC}/g,"not-organic")
        }
        return output
    
    }

    module.exports = replacetemplate;