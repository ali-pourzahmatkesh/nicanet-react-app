import Api from "./Api";

export const CaseApi = {
  addNewCase: data => Api.post("/Case", data),
  updateCase: data => Api.put("/Case", data),
  getSymptoms: () => Api.get("/Symptom"),
  searchDrugs: text => Api.get(`/Drug?drugName=${text}`),
  getDiseases: () => Api.get("/Disease"),
  getExaminationTypes: () => Api.get("/ExaminationType"),
  getExaminationByCaseId: caseId => Api.get(`/ExaminationType/${caseId}`),
  getTags: () => Api.get("/Tag"),
  uploadCasePhoto: bodyFormData =>
    Api({
      url: "/CaseImage",
      method: "POST",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }),
  getCase: (caseId, addVisit) =>
    Api.get(`/Case?id=${caseId}&addVisit=${addVisit || false}`),
  removeDXLikeOrDislike: data => Api.delete("/DxLike", { data }),
  removeRXLikeOrDislike: data => Api.delete("/RxLike", { data }),
  likeDX: data => Api.post("/DxLike", data),
  likeRX: data => Api.post("/RxLike", data)
};
