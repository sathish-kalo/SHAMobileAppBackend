const { param } = require("./ProjectidEntry.routes")
const { getProjectIdEntry, postProjectIdEntry } = require("./ProjectidEntry.services")

module.exports = {
    getProjectIdEntry: (req, res) => {
        const params = req.params;
        
        getProjectIdEntry(params, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    err: err
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },

    postProjectIdEntry: (req, res) => {
        const data = req.body;

        postProjectIdEntry(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    err: err.message || err,
                });
            }

            switch (result) {
                case "Missing required fields":
                    return res.status(400).json({
                        success: 0,
                        message: "All required fields must be provided (ProjectName, Location, EntryTime, IsActive, CreatedBy, CreatedDate)",
                    });

                case 1:
                    return res.status(201).json({
                        success: 1,
                        message: "Project entry successfully added",
                    });
                case "Something wen wrong":
                    return res.status(403).json({
                        success: 0,
                        message: "Something wen wrong",
                    });

                default:
                    return res.status(500).json({
                        success: 0,
                        message: "backend server error",
                    });
            }
        })
    },
}