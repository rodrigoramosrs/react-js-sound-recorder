
var app_id = 'app_data'

export function getAppId()
{
    return app_id;
}


export function generateNewAppId()
{
    app_id = 'app_' + Math.random().toString();
}

export default app_id;
