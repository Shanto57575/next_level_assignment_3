import { Request, Response } from "express";
import Book from "../models/book.model";
import getErrorMessage from "../utils/getError";

const createNewBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  try {
    const newBook = await Book.create(bookData);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.log("Error while creating book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit = 10 } = req.query;

  try {
    const query: Record<string, any> = {};

    // filtering
    if (filter) {
      query.genre = filter;
    }

    let bookQuery = Book.find(query);

    if (sortBy) {
      bookQuery.sort({ [sortBy]: sort });
    }

    const allBooks = await bookQuery.limit(Number(limit));

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error) {
    console.log("Error while retrieving all books =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);

    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.log("Error while retrieving book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const updateData = req.body;

  try {
    const book = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log("Error while updating book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log("Error while deleting book =>", error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: getErrorMessage(error),
        success: false,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Unknown error occurred",
        success: false,
      });
    }
  }
};

export { createNewBook, getAllBooks, getBookById, updateBook, deleteBook };
