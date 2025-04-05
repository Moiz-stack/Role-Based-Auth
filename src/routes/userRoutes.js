const express = require('express');
const router = require('./authRoutes');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

//only admin can access this router
router.get('/admin', verifyToken, authorizeRoles('admin'), (req,res)=>{
    res.json({
        message: 'Admin route'
    })
})

//only admin and manager
router.get('/manager',verifyToken,authorizeRoles('admin', 'manager'),(req,res)=>{
    res.json({
        message: 'Admin manager'
    })
})

//all can
router.get('/user',verifyToken,authorizeRoles('admin','admin','user'),(req,res)=>{
    res.json({
        message: 'Admin user'
    })
})

module.exports = router;