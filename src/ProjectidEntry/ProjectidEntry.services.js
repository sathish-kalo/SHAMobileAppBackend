const model = require('../database/model');
const sql = require('mssql');

module.exports = {
    getProjectIdEntry: async (params, callback) => {

        try {
            const userid = parseInt(params.id)
            
            const request = model.db.request();
            request.input('Userid', sql.Int, userid);
            let query = `SELECT 
            p.ProjectId,
            j.Location
          FROM MB_projectIdEntry j
          INNER JOIN ProjectDetails p ON j.ProjectName = p.ProjectId 
          INNER JOIN UserMasterDetail u ON u.Userid = j.CreatedBy
          WHERE u.Userid =@Userid and 
            j.IsActive = 1`;
            
            const response = await request.query(query);
            
            return callback(null, response.recordset);
        } catch (err) {
            console.log("error: ",err);
            
            return callback(err)
        }
    },
    // new add jobsheetId start
    postProjectIdEntry: async (data, callback) => {
        try {
            const { ProjectName, Location, EntryTime, CreatedBy } = data;
            if (!ProjectName || !Location || !EntryTime || !CreatedBy) {
                return callback(null, "Missing required fields");
            }

            const request = model.db.request();
            request
                .input("ProjectName", ProjectName)
                .input("Location", Location)
                .input("EntryTime", EntryTime)
                .input("CreatedBy", CreatedBy);

            const insertQuery = `
            INSERT INTO mb_projectIdEntry 
                (ProjectName, Location, EntryTime, IsActive, CreatedBy, CreatedDate)
            VALUES 
                (@ProjectName, @Location, @EntryTime, 1, @CreatedBy, GETDATE())
        `;

            const projectidentryss = await request.query(insertQuery);

            if (projectidentryss.rowsAffected && projectidentryss.rowsAffected[0] > 0) {
                return callback(null, 1);
            }
            return callback(null, "Something wen wrong");

        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

}