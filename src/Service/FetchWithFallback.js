export const fetchWithFallback = async (links,obj) => {
    let response;
    for(let link of links)
    {  try{
        response = await fetch(link,obj)
        if(response.ok)
            return response
          }catch(e){}
    }
     return response
  }