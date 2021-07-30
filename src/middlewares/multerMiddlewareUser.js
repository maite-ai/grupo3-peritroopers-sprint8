const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/images/avatars'),
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
    }
})
const uploadFile=multer({ storage })
module.exports=uploadFile