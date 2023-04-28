import { NextFunction, Response, Request } from "express";
import List from "../model/ListModel";

export const getAllLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await List.find({});
    res.status(200).json({ list });
  } catch (error) {
    console.error(error);
  }
};

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, cardsArray } = req.body;
    const list = await List.create({ name, cardsArray });
    const lists = await List.find({});
    res.status(200).json({ lists });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: listId } = req.params;
    const list = await List.findById(listId);
    // const courses = await Course.find({ lists: list });
    res.status(200).json({ list });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: listId } = req.params;
    const list = await List.deleteOne({ _id: listId });
    const lists = await List.find({});

    res.status(200).send({ lists });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: listId } = req.params;
    const data = req.body;
    const lists = await List.find({});
    const list = await List.findById({ _id: listId });

    res.status(201).json({ lists });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};