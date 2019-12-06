import request from '@/utils/request'

export function getAnalysisCount () {
  return request.get('crm/api/analysis/count')
}

export function getAnalysisTendency (params) {
  return request.get('crm/api/analysis/tendency', { params })
}

export function getAnalysisPriority (params) {
  return request.get('crm/api/analysis/priority', { params })
}

export function getAnalysisDistribution (params) {
  return request.get('crm/api/analysis/distribution', { params })
}

export function getAnalysisStatistics (params) {
  return request.get('crm/api/analysis/statistics', { params })
}

export function getTable (params) {
  return request.get('crm/api/table')
}

export function postForm (data) {
  return request.post('crm/api/form', { data })
}

export function getUser (params) {
  return request.get('crm/api/user')
}

export function getJobs (params) {
  return request.get('crm/api/job')
}

export function getGroup (params) {
  return request.get('crm/api/group')
}

export function getOrganize (params) {
  return request.get('crm/api/organize')
}

export function getBacklog (params) {
  return request.get('crm/api/backlog')
}

export function getProjects (params) {
  return request.get('crm/api/ProjectInfo/queryAll', { params })
}

export function getProjectInfo (params) {
  return request.get('crm/api/ProjectInfo/queryById', { params })
}

export function postSubStageAdd (params) {
  return request.post('crm/api/SubStage/add', { params })
}

export function getWeightExceed100 (params) {
  return request.get('crm/api/SubStage/weightExceed100', { params })
}

export function getSubStageQueryStageTask (params) {
  return request.get('crm/api/SubStage/queryStageTask', { params })
}

export function delSubStage (params) {
  return request.get('crm/api/SubStage/delete', { params })
}

export function getContract (params) {
  return request.get('crm/api/ContractAttachment/queryByPid', { params })
}

export function getCompanyContact (params) {
  return request.get('crm/api/CompanyInfo/queryByProId', { params })
}

export function getStageDeliverable (params) {
  return request.get('crm/api/Deliverable/queryByStageId', { params })
}

export function getApplyList (params) {
  return request.get('crm/api/ApplyInfo/queryAll', { params })
}

export function getBacklogList (params) {
  return request.get('crm/api/TaskInfo/queryByTaskLeaderOrStatus', { params })
}

export function getTaskInfo (params) {
  return request.get('crm/api/TaskInfo/queryById', { params })
}

export function getManagerList (params) {
  return request.get('crm/api/Tenant/getUserByDept', { params })
}

export function postAssignManager (params) {
  return request.get('crm/api/TaskInfo/queryByTaskLeaderOrStatus', { params })
}

export function postProjectUpdata (data) {
  return request.post('crm/api/ProjectInfo/update', data)
}

export function postConApproval (data) {
  return request.post('crm/api/ContractReview/approval', data)
}

export function postTaskAdd (data) {
  return request.post('crm/api/TaskInfo/add', data)
}

export function postFileUpload (data) {
  return request.post('crm/api/File/fileUpload', data)
}

export function changeTaskStatus (data) {
  return request.post('crm/api/TaskInfo/changeStatus', data)
}

export function getRoleList (params) {
  return request.get('crm/api/Tenant/roleList', { params })
}

export function getDeliverableList (params) {
  return request.get('crm/api/Deliverable/queryByProjectId', { params })
}

export function postTaskList (data) {
  return request.post('crm/api/TaskInfo/queryByCondition', data)
}

export function postAppAddPid (data) {
  return request.post('crm/api/ApplyInfo/addByPid', { data })
}

export function postWorkList (data) {
  return request.post('crm/api/WorkLog/queryList', data)
}

export function postListUsers (data) {
  return request.post('crm/api/Tenant/listUsers', data)
}

export function postApprovalList (data) {
  return request.post('crm/api/ApprovalInfo/queryAll', data)
}

export function getAttachmentList (params) {
  return request.get('crm/api/Attachment/queryByTaskId', { params })
}

export function getTaskDeliverList (params) {
  return request.get('crm/api/Deliverable/queryByTaskId', { params })
}