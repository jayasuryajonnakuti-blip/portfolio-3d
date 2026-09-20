import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, AlertTriangle, ArrowRight, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

type ScanState = 'idle' | 'dragging' | 'analyzing' | 'result' | 'error';

interface StagedMedia {
  name: string;
  size: string;
  type: string;
  dimensions?: string;
  previewUrl: string;
  stagingTimeMs: number;
}

export const InstrumentHero: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [stagedMedia, setStagedMedia] = useState<StagedMedia | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please provide a valid image file (PNG, JPEG, WebP).');
      setScanState('error');
      return;
    }

    // Validate size (max 10MB per architectural constraint)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File exceeds 10MB client staging budget.');
      setScanState('error');
      return;
    }

    setScanState('analyzing');
    const startTime = performance.now();

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const endTime = performance.now();
        setStagedMedia({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`,
          previewUrl: result,
          stagingTimeMs: Math.round(endTime - startTime),
        });
        setScanState('result');
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMessage('Client FileReader error staging media.');
      setScanState('error');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (scanState !== 'analyzing') setScanState('dragging');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (scanState === 'dragging') setScanState('idle');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleReset = () => {
    setScanState('idle');
    setStagedMedia(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="instrument-hero-wrap">
      <div className="container instrument-hero-grid">
        {/* Left Column: Thesis & Positioning */}
        <div className="hero-statement-col">
          <div className="telemetry-badge">
            <span className="telemetry-dot" />
            <span>FORENSIC INSTRUMENT // SYS.ONLINE</span>
          </div>

          <h1 className="hero-instrument-title">
            I BUILD SYSTEMS THAT DECIDE <span className="text-signal">WHAT'S REAL</span>
          </h1>

          <p className="hero-thesis-statement">
            Under real constraints, shipped to real users. Full Stack Java engineer and multimodal AI developer—architect of <strong>TruthLens AI</strong>, a client-staged synthetic media forensics instrument.
          </p>

          <div className="hero-cta-cluster">
            <Link to="/work/truthlens" className="btn btn-signal">
              <span>TruthLens Case Study</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://fake-detector-tan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel"
            >
              <span>Launch Live System</span>
            </a>
            <Link to="/about" className="btn btn-panel">
              <span>The Architect</span>
            </Link>
          </div>

          <div className="hero-telemetry-readouts">
            <div className="telemetry-card">
              <div className="telemetry-val text-signal">7.62</div>
              <div className="telemetry-label">B.Tech AI & DS CGPA</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-val text-signal">7+</div>
              <div className="telemetry-label">Verified Certs (Oracle)</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-val text-signal">2</div>
              <div className="telemetry-label">Industry Internships</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Working Forensic Instrument (Dropzone + Reticle Scan) */}
        <div className="instrument-device-col">
          <div
            className={`forensic-device-chassis ${scanState === 'dragging' ? 'is-dragging' : ''} ${scanState === 'analyzing' ? 'is-analyzing' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Device Header Bar */}
            <div className="device-header">
              <div className="device-status">
                <span className="status-light" />
                <span className="status-text">
                  {scanState === 'idle' && 'STAGE 01: READY FOR MEDIA'}
                  {scanState === 'dragging' && 'STAGE 01: DROP DETECTED'}
                  {scanState === 'analyzing' && 'STAGE 02: INGESTING ARRAYBUFFER...'}
                  {scanState === 'result' && 'STAGE 03: CLIENT STAGED // READY'}
                  {scanState === 'error' && 'STAGE 00: FAULT DETECTED'}
                </span>
              </div>
              <div className="device-hardware-tag">FILEREADER V2.4</div>
            </div>

            {/* Screen / Scan Viewport */}
            <div className="device-screen">
              {/* Active Sweeping Reticle Laser */}
              <div className="reticle-sweep-laser" />
              <div className="reticle-crosshair" />

              {/* IDLE / DRAGGING STATE */}
              {(scanState === 'idle' || scanState === 'dragging') && (
                <div className="dropzone-prompt" onClick={() => fileInputRef.current?.click()}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <div className="drop-icon-ring">
                    <UploadCloud size={28} className="drop-icon" />
                  </div>
                  <div className="drop-headline">DROP MEDIA TO STAGE FORENSIC INSPECTION</div>
                  <div className="drop-subtext">
                    or <span className="text-signal">click to browse</span> (PNG, JPEG, WebP • Max 10MB)
                  </div>
                  <div className="drop-guarantee">
                    <ShieldCheck size={14} color="#FF3B30" />
                    <span>Client-side verification: zero data leaves your browser tab</span>
                  </div>
                </div>
              )}

              {/* ANALYZING STATE */}
              {scanState === 'analyzing' && (
                <div className="analyzing-state">
                  <div className="scanning-radar-spinner" />
                  <div className="analyzing-headline">INGESTING IN-MEMORY ARRAYBUFFER</div>
                  <div className="analyzing-telemetry">
                    <span>Calculating byte offsets...</span>
                    <span>Validating MIME header...</span>
                  </div>
                </div>
              )}

              {/* RESULT STATE: REAL VERIFIED READOUT */}
              {scanState === 'result' && stagedMedia && (
                <div className="staged-result-panel">
                  <div className="staged-preview-wrap">
                    <img src={stagedMedia.previewUrl} alt="Staged Forensic Input" className="staged-img" />
                    <div className="preview-reticle-box" />
                  </div>

                  <div className="staged-metadata-list">
                    <div className="meta-row">
                      <span className="meta-k">FILE NAME</span>
                      <span className="meta-v truncate">{stagedMedia.name}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-k">DIMENSIONS</span>
                      <span className="meta-v text-signal">{stagedMedia.dimensions}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-k">IN-MEMORY SIZE</span>
                      <span className="meta-v">{stagedMedia.size}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-k">INGEST SPEED</span>
                      <span className="meta-v text-signal">{stagedMedia.stagingTimeMs} ms</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-k">STAGING STATUS</span>
                      <span className="meta-v">VERIFIED CLEAN (0 SERVER BYTES)</span>
                    </div>
                  </div>

                  <div className="staged-actions">
                    <a
                      href="https://fake-detector-tan.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-signal btn-sm"
                    >
                      <Cpu size={14} />
                      <span>Run Multimodal Reasoning on TruthLens</span>
                      <ArrowRight size={14} />
                    </a>
                    <button type="button" onClick={handleReset} className="btn btn-panel btn-sm">
                      <RefreshCw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR STATE */}
              {scanState === 'error' && (
                <div className="error-state">
                  <AlertTriangle size={32} color="#FF3B30" />
                  <div className="error-headline">STAGE REJECTED</div>
                  <div className="error-msg">{errorMessage}</div>
                  <button type="button" onClick={handleReset} className="btn btn-signal btn-sm" style={{ marginTop: '12px' }}>
                    <RefreshCw size={14} />
                    <span>Try Another File</span>
                  </button>
                </div>
              )}
            </div>

            {/* Device Footer Telemetry Rail */}
            <div className="device-footer-rail">
              <span className="rail-stat">MEM BUDGET: 10MB</span>
              <span className="rail-divider">|</span>
              <span className="rail-stat">SERVER TRANSIT: 0B</span>
              <span className="rail-divider">|</span>
              <span className="rail-stat text-signal">FORENSICS: READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
