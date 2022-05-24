import express from "express";
import message from "../components/message/network.js";

const routes = function(server){
    server.use('/message',message);
}

export default routes;
