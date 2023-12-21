import reducersClass from"./reducers";import filterValues,{months,dateOperatorsDefinate,dateOperatorsIndefinate,absoluteContextuals,relativeContextuals}from"./../values/filterValues";import{tablesome_format,tablesome_isValid,tablesome_PHPDate}from"./../src/wrapper/date-fns";import{LexoRank}from"lexorank";import{writable,readable,derived,get}from"svelte/store";import WorkflowOptions from"../svelte/settings/workflow/utils/options.js";import WorkflowOptionsGetter from"./../svelte/settings/workflow/utils/optionsGetter";import WorkflowEventHandler from"./../svelte/settings/workflow/utils/eventHandler";import ColumnStore from"./stores/columnStore";import rowStore from"./stores/rowStore";class Store{tableTitle;mode;tableID;isAdminUser;columns;rowLimit;siteTimezone;columnLimit;currentPage;lastColumnID;lastStateRecordID;optionsStatus;filters;sortOrder;sortField;triggers;searchQuery;activeRowIndex;activeCellIndex;activeColumnIndex;sfsRecords;viewableRecords;numOfTotalPages;manipulators;computedFilterOptions;mappedDateColumns;columnStore;rowStore;constructor(e){this.tableID=e.tableID,this.isAdminUser=e.isAdminUser,this.mode=writable(e.mode||"editor"),this.hooks=e.hooks,this.columnLimit=e.columnLimit,this.tableTitle=readable(e.tableTitle),this.rowLimit=e.rowLimit,this.editorState=writable(e.editorState||{}),this.display=writable(e.display||{}),this.style=writable(e.style||{}),this.siteTimezone=e.siteTimezone,this.columnStore=new ColumnStore(e,this),this.rowStore=new rowStore(e,this);let t={fields:e.accessControl?e.accessControl:{},options:{roles:[]}};this.accessControl=writable(t),this.isChangesMadeInTable=writable(!1),this.lastColumnID=e.lastColumnID||"",this.currentPage=writable(0),this.lastColumnID=writable(e.lastColumnID||1),this.lastStateRecordID=writable(e.lastStateRecordID||1),this.filters=writable(e.filters||[]);let s=new WorkflowOptionsGetter(this),r=new WorkflowEventHandler(this),o={triggers:e.triggers&&e.triggers.length?e.triggers:[{}],options:WorkflowOptions,optionsStatus:{},optionsGetter:s.getter,eventHandler:r.eventHandler};this.workflow=writable(o),this.optionsStatus=writable({isFilterOptionActive:!1,focusElement:""}),this.searchQuery=writable(null),this.sortOrder=writable(e.sort?.order??"desc"),this.sortField=writable(e.sort?.field??"created_at"),this.activeColumnIndex=writable(e.sort?.index??-1),this.activeRowIndex=writable(null),this.activeEditableRowIndex=writable(null),this.activeCellIndex=writable(null);const l=get(this.rowStore.rows),a=this.columnStore.get(),i=get(this.rowStore.recordsInserted);if(0==a.length&&0==l.length&&0==this.tableID&&0==get(this.filters).length){a.push({id:get(this.lastColumnID),name:"Column Name",format:"text"});let e={record_id:0,stateRecordID:get(this.lastStateRecordID),content:[{type:"text",value:"",html:""}],rank_order:LexoRank.min().genNext().toString(),created_at:tablesome_PHPDate(),updated_at:tablesome_PHPDate()};l.push(e),i.push(e),this.columnStore.set(a),this.rowStore.rows.set(l),this.rowStore.recordsInserted.set(i)}this.reducers=new reducersClass(e.hooks),this.manipulators=derived([this.columnStore.columns,this.currentPage,this.searchQuery,this.filters,this.sortOrder,this.sortField,this.activeColumnIndex,this.display,this.mode],(([e,t,s,r,o,l,a,i,n])=>({pagination:{numOfRecordsPerPage:"read-only"==n?i.numOfRecordsPerPage:10,currentPage:t},search:s,columns:e,filters:r,tableSort:{sortingBy:i.sortingBy,sortingOrder:i.sortingOrder,mode:n},sort:{order:o,field:l,column:e[a],index:a}}))),this.sfsRecords=derived([this.rowStore.rows,this.manipulators],(([e,t])=>this.reducers.getSfsRecords(e,t))),this.viewableRecords=this.getViewableRecords(),this.numOfTotalPages=this.getNumOfTotalPages(),this.calculatedColumnValues=this.getCalculatedColumnValues(),this.computedFilterOptions=this.getComputedFilterOptions(),this.mappedDateColumns=this.getMappedDateColumns()}getNumOfTotalPages(){return derived([this.sfsRecords,this.mode,this.display],(([e,t,s])=>{let r="read-only"==t?s.numOfRecordsPerPage:10;return Math.ceil(e.length/r)}))}getMappedDateColumns(){return derived([this.workflow,this.columnStore.columns],(([e,t])=>{let s=[];if(!e.triggers||0==e.triggers.length)return[];let r=e.triggers;for(let e=0;e<r.length;e++){const t=r[e];if(!t.actions||0==t.actions.length)continue;let o=t.actions;for(let e=0;e<o.length;e++){const t=o[e];if(!t.match_columns||0==t.match_columns.length)continue;let r=t.match_columns;for(let e=0;e<r.length;e++){const t=r[e];let o=t.column_id,l=t.detection_mode,a=t.field_type;0!=o&&"disabled"!=l&&"trigger_source"==a&&s.push(o)}}}if(0!=t.length)for(let e=0;e<t.length;e++){const r=t[e];if("date"!=r.format){const e=t.indexOf(r.id);e>-1&&s.splice(e,1)}}return s}))}updateEditorState(e,t){this.editorState.update((s=>(s[e]=t,s)))}setDisplayField(e,t){this.display.update((s=>(s[e]=t,s)))}setAccessControlField(e,t,s="fields"){this.accessControl.update((r=>(r[s][e]=t,r)))}setStyleField(e,t){this.style.update((s=>(s[e]=t,s)))}getCalculatedColumnValues(){return derived([this.sfsRecords,this.columnStore.columns],(([e,t])=>{let s=[];return t.forEach(((t,r)=>{let o="";if("number"==t.format&&t.calculate&&"none"!=t.calculate){o=0;let s=0,l=0,a=0,i=0,n=0,d=0;const c=e=>(e=parseFloat(e),isNaN(e)?0:e);switch(e.forEach((e=>{let t=c(e.content[r].value);t?(s+=t,0==l?(a=t,i=t):(a=Math.min(a,t),i=Math.max(i,t)),n++):d++,l++})),t.calculate){case"sum":o=s;break;case"average":o=s/n;break;case"count":o=l;break;case"min":o=a;break;case"max":o=i;break;case"non_empty_count":o=n;break;case"empty_count":o=d}o=+o.toFixed(3)}s.push(o)})),s}))}getComputedFilterOptions(){return derived(this.filters,(e=>(e.forEach((e=>{e.availableOperators=this.getOperators(e.format,e.contextual.value);let t=e.operator.value;return-1==e.availableOperators.findIndex((e=>e.value===t))&&(e.operator=e.availableOperators[0]),e.availableContextuals=this.getContextuals(t),e.availableMonths=months,e})),e)))}getOperators(e,t){let s=filterValues[e];return"date"==e&&("month"==t||"year"==t||"exact_date"==t||null==t?(s=[...dateOperatorsDefinate],s.splice(2,0,...dateOperatorsIndefinate)):s=[...dateOperatorsDefinate]),s}getContextuals(e){let t=[...relativeContextuals];return"="!=e&&"!="!=e&&null!=e||(t=[...absoluteContextuals,...relativeContextuals]),t}getViewableRecords(){return derived([this.sfsRecords,this.manipulators],(([e,t])=>this.reducers.getViewableRecords(e,t)))}setCurrentPage(e){this.currentPage.set(e)}setIsChangesMadeInTable(e){this.isChangesMadeInTable.set(e)}setOptionStatus(e){this.optionsStatus.hasOwnProperty(e.name)&&(this.optionsStatus[e.name]=e.value)}setSearchQuery(e){this.searchQuery.set(e)}setSortOrder(e){this.sortOrder.set(e)}changeCellType(e,t){const s=this.columnStore.get(),r=get(this.rowStore.rows);s[e].format!=t&&(s[e].format=t,"url"==t&&null==s[e].no_follow&&(s[e].no_follow=!1),"url"==t&&null==!s[e].open_in_new_tab&&(s[e].open_in_new_tab=!0),r.map((s=>{if("number"==t&&(s[e]=isNaN(Number(s[e]))||""==s[e]?"":Number(s[e])),"text"==t&&(s[e]=String(s[e])),"date"==t){let t=this.dateParse(s.content[e].value,s.content[e].html);s.content[e].type="date",s.content[e].value=t.value,s.content[e].html=t.html}})),this.columnStore.set(s),this.rowStore.rows.set(r))}dateParse(e,t){const s={value:e,html:t};if(e&&"string"==typeof e&&"undefined"!=e&&NaN!=e&&"0"!=e){let t=parseInt(Date.parse(e));s.value=t,s.html=tablesome_isValid(t)?tablesome_format(t,tablesome_settings.date_format):""}return s}setActiveRowIndex(e){this.activeRowIndex.set(e)}setActiveEditableRowIndex(e){this.activeEditableRowIndex.set(e)}setActiveCellIndex(e){this.activeCellIndex.set(e)}deleteFilter(e){if(e>-1){const t=get(this.filters);t.splice(e,1),this.filters.set(t)}}addFilter(){const e={column_index:0,format:get(this.columnStore.columns)[0].format,contextual:"",value:""};e.availableOperators=this.getOperators(e.format,""),e.operator=e.availableOperators[0],this.filters.update((t=>(t.push(e),t))),this.activeCellIndex.set(null)}updateFilters(e){let t=this;e.forEach((e=>{let s=e.column_index;e.column_index=s,e.format=t.columnStore.columns[s].format})),this.filters=e}updateFilter(e,t){e.format=get(this.columnStore.columns)[e.column_index].format,this.filters.update((s=>(s[t]=e,s)))}setActiveColumnIndex(e){this.activeColumnIndex.set(e)}setSortField(e){this.sortField.set(e)}updateCellValue(e){let t=e.rowIndex,s=get(this.rowStore.rows),r={rows:s,rowIndex:t,cellData:e};r=this.hooks.applyFilters("getRecords",r),s=r.rows,"value"in e&&(s[t].content[e.cellIndex].value=e.value),"html"in e&&(s[t].content[e.cellIndex].html=e.html),"attachment"in e&&(s[t].content[e.cellIndex].attachment=e.attachment),"type"in e&&(s[t].content[e.cellIndex].type=e.type),"file_type"in e&&(s[t].content[e.cellIndex].file_type=e.file_type),"link"in e&&(s[t].content[e.cellIndex].link=e.link),s[t].updated_at=tablesome_PHPDate(),this.rowStore.rows.set(s),this.rowStore.recordUpdate(t)}_movePosition(e,t,s){const r=e[t];e.splice(t,1),e.splice(s,0,r)}_getEmptyRow(e){this.rowStore.lastStateRecordID.update((e=>e+1));const t=get(this.rowStore.rows),s=t.length,r=t[e].rank_order,o=e+1;let l="";if(s==o)l=LexoRank.parse(r).genNext().toString();else{const e=LexoRank.parse(r),s=LexoRank.parse(t[o].rank_order);l=e.between(s).toString()}return{record_id:0,stateRecordID:get(this.lastStateRecordID),content:[],rank_order:l,created_at:tablesome_PHPDate(),updated_at:tablesome_PHPDate()}}}export default Store;