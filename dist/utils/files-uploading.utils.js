"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.pdfFileFilter = exports.csvFileFilter = exports.excelFileFilter = exports.imageFileFilter = void 0;
exports.imageResizer = imageResizer;
const fs = __importStar(require("fs"));
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const excelFileFilter = (req, file, callback) => {
    if (file.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return callback(new Error('Only Excell files are allowed!'), false);
    }
    callback(null, true);
};
exports.excelFileFilter = excelFileFilter;
const csvFileFilter = (req, file, callback) => {
    if (file.mimetype !== 'text/csv' &&
        file.mimetype !== 'application/vnd.ms-excel') {
        return callback(new Error('Only CSV files are allowed!'), false);
    }
    callback(null, true);
};
exports.csvFileFilter = csvFileFilter;
const pdfFileFilter = (req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
        return callback(new Error('Only PDF files are allowed!'), false);
    }
    callback(null, true);
};
exports.pdfFileFilter = pdfFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
async function imageResizer(image, folderPath) {
    const resizeImage = await (0, sharp_1.default)(image.path).resize(350, 180).png().toBuffer();
    const resizeImageName = image.filename.split('.')[0] + '_350_180.png';
    const resizeImagePathName = `./uploads/images/${folderPath}/${resizeImageName}`;
    const imagePathPromise = new Promise((resolve, reject) => {
        fs.writeFile(resizeImagePathName, resizeImage, (err) => {
            if (!err) {
                fs.unlink(`./uploads/images/${folderPath}/${image.filename}`, (delErr) => {
                    if (delErr) {
                        console.log(delErr);
                    }
                });
                resolve('images/' + folderPath + '/' + resizeImageName);
            }
            else {
                reject(err.message);
            }
        });
    });
    return imagePathPromise;
}
//# sourceMappingURL=files-uploading.utils.js.map