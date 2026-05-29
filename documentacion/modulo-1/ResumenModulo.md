# Módulo 1: De Documentos a Decisiones

**La ruta inteligente para la evaluación crediticia**


## Resumen del módulo (visión global)

Aprenderás a construir un **flujo de evaluación crediticia** sobre AWS, expuesto como **API REST en NestJS**:

1. **Extraer** datos de documentos bancarios reales (solicitudes, identidad, estados de cuenta, colillas) con **Amazon Textract** y S3.
2. **Transformar y limpiar** esos datos con **AWS Glue** (PySpark), generando un dataset en Parquet listo para machine learning.
3. **Entrenar y desplegar** dos modelos en **SageMaker**: uno para **riesgo de mora** (regresión logística) y otro para **monto de crédito** (XGBoost).
4. **Explicar** las decisiones con **SageMaker Clarify** (SHAP), en lenguaje útil para riesgo y cumplimiento (**ASFI Bolivia**).
5. **Integrar** todo en endpoints de justificación y un pipeline end-to-end, desplegable en **Docker / Render**.


---

## Documentos de referencia para el caso de crédito

Durante el módulo trabajaremos con documentos similares a los que suelen aparecer en un trámite de crédito bancario o crédito de vivienda. La idea es usarlos como **documentos de práctica** para extracción, limpieza, validación y modelado.



### Documentos que pueden formar parte del expediente

| Categoría | Documentos posibles | Uso en el curso |
|-----------|---------------------|-----------------|
| Identidad | Documento de identidad del solicitante y cónyuge | `AnalyzeID`, validación de identidad |
| Solicitud | Formulario de solicitud de crédito | FORMS, pares clave-valor |
| Situación familiar | Certificado de soltería o documento equivalente, si corresponde | Validación complementaria |
| Ingresos dependientes | Boletas de salario, certificado de trabajo, extracto de Gestora/AFP, extractos de cuenta sueldo | Extracción de ingresos y antigüedad laboral |
| Ingresos independientes | NIT, licencia de funcionamiento, formularios de impuestos, extractos bancarios | Respaldo de actividad económica e ingresos |
| Historial financiero | Extractos de deudas, comprobantes de pago, reporte de obligaciones | Cálculo de endeudamiento |
| Vivienda social | Certificado de no propiedad o declaración jurada de única vivienda | Validación de elegibilidad |
| Inmueble / garantía | Título de propiedad, folio real actualizado, tradicional decenal, plano de ubicación, certificado catastral | Análisis de garantía hipotecaria |
| Impuestos del inmueble | Comprobantes de pago de impuestos de gestiones anteriores | Verificación documental |
| Vendedor | Documento de identidad de vendedores | Validación de partes |
| Valoración | Avalúo del inmueble o presupuesto de obra | Estimación de valor y monto financiable |

### Ejemplos útiles para crear documentos de laboratorio

- Solicitud de crédito hipotecario.
- Documento de identidad.
- Certificado de trabajo.
- Boleta de pago.
- Extracto de cuenta bancaria.
- Formulario de impuestos o constancia NIT.
- Certificado de no propiedad.
- Folio real.
- Certificado catastral.
- Comprobante de pago de impuestos del inmueble.
- Avalúo del inmueble o presupuesto de obra.

Estos documentos permitirán practicar distintas capacidades de Textract:

- texto simple (`DetectDocumentText`);
- formularios y pares clave-valor (`AnalyzeDocument` con FORMS);
- tablas (`AnalyzeDocument` con TABLES);
- documentos de identidad (`AnalyzeID`);
- documentos personalizados con consultas (`Queries`).

---

## Unidades y tecnologías

| # | Unidad | Clases | Horas (este curso) | Tecnologías |
|---|--------|--------|-------------------|-------------|
| 1 | Amazon Textract con NestJS | 1–3 | 9 h | Amazon Textract, NestJS, AWS S3 |
| 2 | Transformación con AWS Glue | 4–5 | 6 h | AWS Glue, PySpark, Amazon Athena, S3 |
| 3 | Modelado con SageMaker | 6–8 | 9 h | SageMaker Studio, Scikit-learn, XGBoost |
| 4 | Explicabilidad con SageMaker Clarify | 9–11 | 8 h | SageMaker Clarify, SHAP, NestJS |


---

## Qué verás en cada clase

### Unidad 1 — Amazon Textract con NestJS (clases 1–3)

Extraer datos de documentos bancarios y exponerlos vía API REST.

#### Clase 1 — Introducción a AWS Textract y configuración del entorno · 3 h

| | |
|---|---|
| **Controlador** | `Clase01Controller` — `POST /modulo1/clase01/textract/text` |

**Objetivos:** Comprender Textract y su uso en banca; configurar NestJS para consumir la API; primera extracción de texto de un documento simple.

**Teoría:** Qué es Textract (`DetectDocumentText`, `AnalyzeDocument`, `AnalyzeExpense`, `AnalyzeID`); OCR tradicional vs análisis inteligente; tipos de documentos bancarios; precios; arquitectura NestJS (módulos, servicios, inyección de dependencias).

**Práctica:** Proyecto NestJS; `@aws-sdk/client-textract` y S3; `TextractService`; subir PDF a S3; `DetectDocumentText`; parsear bloques `LINE`/`WORD`; endpoint REST; actividad con documento propio.

---

#### Clase 2 — Formularios, identidades, tablas y documentos financieros · 3 h

| | |
|---|---|
| **Controlador** | `Clase02Controller` |

**Endpoints:** `POST .../textract/form` (FORMS), `.../id` (AnalyzeID), `.../statement` (TABLES), `.../payslip` (AnalyzeExpense).

**Objetivos:** Pares clave-valor en formularios; documentos de identidad; tablas en estados de cuenta; colillas con AnalyzeExpense; un endpoint por tipo de documento.

**Teoría:** Bloques `PAGE`, `LINE`, `WORD`, `KEY_VALUE_SET`, `TABLE`, `CELL`; `FeatureTypes` FORMS y TABLES; campos AnalyzeID; AnalyzeExpense (LineItem, Summary, Vendor); confianza y umbrales; procesamiento asíncrono `StartDocumentAnalysis` para documentos grandes.

**Práctica:** `parseKeyValues()`, `parseTable()`; mapeo de cédula/ID; cuatro endpoints; pruebas Postman con documentos reales; comparar casos de baja confianza.

---

#### Clase 3 — Queries, documentos personalizados y pipeline unificado · 3 h

| | |
|---|---|
| **Controlador** | `Clase03Controller` |

**Endpoints:** `POST .../textract/custom`, `POST .../textract/document`.

**Objetivos:** Textract Queries para formatos propios; catálogo de queries por tipo; endpoint inteligente por `documentType`; pipeline unificado de extractores.

**Teoría:** Queries vs FORMS vs AnalyzeExpense; diseño de queries (lenguaje natural, alias); límite 15 queries; estrategia `tipo_documento → queries[]`.

**Práctica:** `document-queries.config.ts` (certificado de trabajo, carta bancaria, contrato alquiler, declaración impuestos, etc.); `QueryExtractorService`; `POST /textract/custom`; enrutador `POST /textract/document` con respuesta normalizada; cada alumno añade un tipo nuevo con ≥ 5 queries.

---

### Unidad 2 — Transformación con AWS Glue (clases 4–5)

Refinar datos extraídos: limpieza, normalización y feature engineering para ML.

#### Clase 4 — Transformación de datos con AWS Glue: fundamentos · 3 h

| | |
|---|---|
| **Controlador** | `Clase04Controller` |

**Endpoints:** `POST .../glue/transform`, `GET .../glue/jobs/:jobRunId`.

**Objetivos:** Arquitectura Glue (Data Catalog, Crawlers, Jobs); job que limpie JSON de Textract; normalizar campos clave para ML.

**Teoría:** Glue Data Catalog, Crawlers, Jobs Spark / Python Shell; DynamicFrame vs DataFrame; transformaciones (`ResolveChoice`, `DropNullFields`, `Map`, `Filter`); data lake en S3 y particionamiento.

**Práctica:** Glue Job Python Shell: leer JSON en S3, filtrar `confidence < 80%`, `snake_case`, tipos fecha/monto; salida Parquet; Crawler; NestJS dispara y consulta el job; batch ~10 documentos.

---

#### Clase 5 — Transformación avanzada y feature engineering con Glue · 3 h

| | |
|---|---|
| **Controlador** | `Clase05Controller` |

**Endpoints:** `POST .../glue/features`, `GET .../features/status/:jobRunId`, `GET .../features/schema`.

**Objetivos:** Variables derivadas para crédito; integrar formulario + identidad + estado de cuenta; dataset final para SageMaker.

**Teoría:** Features de crédito (ratio deuda/ingreso, historial de pagos, antigüedad laboral); join de DynamicFrames; imputación de nulos; one-hot encoding.

**Práctica:** Job Spark: join por `solicitud_id`; `debt_to_income_ratio`, `payment_history_score`, `employment_tenure_months`, `has_guarantor`; one-hot `tipo_empleo`, `sector_economico`; exportar `features.parquet`; explorar con Athena/Glue Studio.

---

### Unidad 3 — Modelado con SageMaker (clases 6–8)

Entrenar y desplegar modelos de riesgo y monto de crédito.

#### Clase 6 — Modelo 1: clasificación de riesgo crediticio (regresión logística) · 3 h

| | |
|---|---|
| **Controlador** | `Clase06Controller` |

**Endpoints:** `POST .../sagemaker/train-risk`, `GET .../train-risk/:jobName`, `GET .../models/risk/metrics`.

**Objetivos:** SageMaker Studio; entrenar regresión logística para mora; métricas bancarias AUC-ROC, KS, Gini.

**Teoría:** Studio, experimentos, Model Registry; regresión logística y contexto ASFI; AUC-ROC, KS, Gini, PSI; clases desbalanceadas (`class_weight`, SMOTE).

**Práctica:** Cargar `features.parquet`; split 70/15/15; SKLearn Estimator `train.py`; matriz de confusión; registrar modelo; API para lanzar/consultar training; meta AUC-ROC ≥ 0,75.

---

#### Clase 7 — Modelo 2: predicción de monto de crédito (XGBoost) · 3 h

| | |
|---|---|
| **Controlador** | `Clase07Controller` |

**Endpoints:** `POST .../sagemaker/train-amount`, `GET .../train-amount/:jobName`, `GET .../models/amount/metrics`, `GET .../models/compare`.

**Objetivos:** XGBoost para monto óptimo; comparar con modelo logístico; implicaciones regulatorias de modelos complejos.

**Teoría:** Gradient boosting; clasificación (aprobar/rechazar) vs regresión (monto en Bs); RMSE, MAE, R²; tradeoff precisión vs explicabilidad ASFI.

**Práctica:** Target `monto_otorgado`; contenedor XGBoost built-in; hyperparameter tuning (opcional); feature importance; Model Registry; endpoint comparativo de métricas.

---

#### Clase 8 — SageMaker Endpoints: despliegue y evaluación en tiempo real · 3 h

| | |
|---|---|
| **Controlador** | `Clase08Controller` |

**Endpoints:** `POST .../models/evaluate`, `POST .../models/risk`, `POST .../models/amount`.

**Objetivos:** Desplegar ambos modelos como endpoints; consumirlos desde NestJS; comparar resultados con casos reales.

**Teoría:** Tipos de endpoint (Real-time, Serverless, Async, Batch); instancias `ml.t2.medium` vs `ml.m5.large`; CSV vs JSON; costos y auto-scaling.

**Práctica:** Endpoints `credit-risk-classifier` y `credit-amount-predictor`; `SageMakerService`; `POST /models/evaluate`; colección Postman ~20 casos; documentar casos inesperados.

---

### Unidad 4 — Explicabilidad con SageMaker Clarify (clases 9–11)

SHAP, transparencia y cumplimiento; API de justificación e integración final.

#### Clase 9 — Clarify: explicabilidad del modelo de clasificación · 3 h

| | |
|---|---|
| **Controlador** | `Clase09Controller` |

**Endpoints:** `POST .../explain/risk/run`, `GET .../explain/risk/report`, `POST .../explain/risk/case`.

**Objetivos:** SHAP en crédito; Clarify para Modelo 1; interpretación bajo requisitos ASFI.

**Teoría:** Explicabilidad en banca (ASFI, Ley 393); SHAP global vs local; summary plot, force plot; sesgos (DPL, DI, DPPL).

**Práctica:** `SageMakerClarifyProcessor`; baseline; reportes en S3; top variables; force plot (aprobado/rechazado/borderline); justificación legible para cliente rechazado; análisis de sesgo.

---

#### Clase 10 — Clarify: explicabilidad del modelo de regresión · 3 h

| | |
|---|---|
| **Controlador** | `Clase10Controller` |

**Endpoints:** `POST .../explain/amount/run`, `GET .../explain/amount/report`, `GET .../explain/compare`.

**Objetivos:** Clarify en XGBoost; comparar explicabilidad entre modelos; reportes de transparencia para auditoría.

**Teoría:** SHAP en regresión vs clasificación; Partial Dependence Plots; estructura de reporte ASFI; explicar monto sugerido.

**Práctica:** Clarify Modelo 2; dependence plot `debt_to_income_ratio` vs monto; tabla top 5 variables por modelo; PDF automatizado; caso de discrepancia entre modelos y regla de negocio.

---

#### Clase 11 — API de justificación, integración final y presentaciones · 2 h

| | |
|---|---|
| **Controlador** | `Clase11Controller` |

**Endpoints:** `POST .../explain/risk`, `.../explain/amount`, `.../explain/full`, `POST .../pipeline/full`, `GET .../clase11/health` (+ `GET /health` global).

**Objetivos:** Endpoints con explicaciones SHAP legibles; integrar Clarify con evaluación en tiempo real; pipeline completo Textract → Glue → SageMaker → Clarify → API; demo end-to-end; presentación de proyectos.

**Teoría (condensada):** Servicio de explicabilidad en producción; SHAP on-demand vs batch; formato para oficiales de crédito; logging y auditoría; consideraciones producción (ASFI, cifrado S3, VPC, costos endpoints); vista previa Módulo 2 (n8n + LLM).

**Práctica:** `ClarifyService` + `formatExplanation()`; pipeline orquestado; demo en vivo con documentos de prueba; presentaciones breves (5–7 min); criterios: Textract, Glue, métricas (AUC ≥ 0,75), Clarify, API/Docker.

---

## Cómo usar este material

1. Lee este README para la visión del módulo.
2. Antes de cada sesión, abre `clase-XX/README.md` (alumnos).
3. Implementa en tu `esqueleto/` siguiendo la parte práctica.
4. Despliega con `esqueleto/DEPLOY.md` cuando el Docker esté publicado.
