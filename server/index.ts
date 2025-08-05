import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// ====================
// ✅ PDF Endpoint
// ====================
app.get("/api/generate-pdf", (_req: Request, res: Response) => {
  const doc = new PDFDocument();
  const filename = "output.pdf";

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);
  doc.fontSize(25).text("Hello from PDFKit!");
  doc.end();
});

// ====================
// ✅ CSV Endpoint
// ====================
app.post("/api/convert-json-to-csv", (req: Request, res: Response) => {
  const { jsonData } = req.body;

  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(jsonData);

    res.header("Content-Type", "text/csv");
    res.attachment("output.csv");
    res.send(csv);
  } catch (err: any) {
    res.status(400).json({ message: "Invalid JSON data", error: err.message });
  }
});

(async () => {
  app.use(express.static("dist"));

  // Serve images from client/public/images
  app.use(
    "/images",
    express.static(path.join(__dirname, "../client/public/images")),
  );

  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in dev mode
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      console.log(`serving on port ${port}`);
    },
  );
})();
