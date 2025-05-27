# BlockFinAI Frontend
This repository contains the React + Vite front-end for BlockFinAI, embedding a Streamlit backend for chart analysis.

## Local Development
### 1. Run the backend (Streamlit)
```bash
cd ../BlockFINAI-main1/ChartScanAI-main
pip install -r requirements.txt
python -m streamlit run app.py \
  --server.address 0.0.0.0 \
  --server.port 8502 \
  --server.enableCORS false \
  --server.enableXsrfProtection false
```
The backend will be available at <http://localhost:8502>.

### 2. Run the frontend (React)
```bash
cd ../BlockFin-main
npm install
npm run dev
```
Open <http://localhost:8080> in your browser to view the app. The ChartScan page embeds the backend at port 8502.

## License
This project is licensed under the MIT License. See <../BlockFINAI-main1/ChartScanAI-main/LICENSE> for details.
