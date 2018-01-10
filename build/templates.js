angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/start/start-map.html","<md-content flex layout=column layout-fill><ui-gmap-google-map center=startMapVm.map.center options=startMapVm.mapOptions zoom=startMapVm.map.zoom><ui-gmap-markers models=startMapVm.markers type=\"\'cluster\'\" coords=\"\'self\'\" icon=\"\'icon\'\" idkey=\"\'key\'\" options=\"\'options\'\" typeoptions=startMapVm.clusterOptions fit=true></ui-gmap-markers></ui-gmap-google-map></md-content>");
$templateCache.put("app/start/start.html","<div data-ng-include=\"\'app/start/start-map.html\'\" data-ng-controller=\"StartMapCtrl as startMapVm\"></div>");
$templateCache.put("app/station/station-cams-and-photos-dialog.html","<md-dialog aria-label=Photo><md-dialog-content><img data-ng-src=\"data:image/png;base64, {{ dialogVm.webcamPhoto.photo }}\" alt=\"{{ dialogVm.webcamPhoto.station_name }}, {{ dialogVm.webcamPhoto.timestamp }}\" style=\"margin: auto; max-width: 100%;\"></md-dialog-content></md-dialog>");
$templateCache.put("app/station/station-cams-and-photos-livewebcams.html","<md-content class=md-padding layout-xs=column layout=row><div ng-show=stationCamsAndPhotosLiveWebcamsCtrlVm.noLiveWebcams()><p class=md-body-1>No live webcams available!</p></div><div flex-xs flex-gt-xs=50 layout=column ng-repeat=\"liveWebcam in stationCamsAndPhotosLiveWebcamsCtrlVm.liveWebcams\"><md-card><md-card-header><md-card-avatar><md-icon class=md-avatar-icon><ng-md-icon class=md-avatar-icon icon=live_tv size=24></ng-md-icon></md-icon></md-card-avatar><md-card-header-text><span class=md-title>{{ stationCamsAndPhotosLiveWebcamsCtrlVm.station.name }}</span> <span class=md-subhead>Live Camera {{ $index + 1 }}</span></md-card-header-text></md-card-header><md-divider><img data-ng-src=\"{{ liveWebcam.url }}\" class=md-card-image alt=\"{{ liveWebcam.station_id }}\"></md-divider></md-card></div></md-content>");
$templateCache.put("app/station/station-cams-and-photos-photos.html","<md-content class=md-padding><md-card><md-toolbar class=md-hue-1><div class=md-toolbar-tools><h2>Photo Archive</h2><span flex></span><md-datepicker ng-model=stationCamsAndPhotosPhotosCtrlVm.datePickerModel.date md-placeholder=\"Enter date\" ng-change=stationCamsAndPhotosPhotosCtrlVm.dateChange()></md-datepicker></div></md-toolbar><md-divider><md-card-content><div class=photo-grid><div ng-show=stationCamsAndPhotosPhotosCtrlVm.noWebcamPhotos()><p class=md-body-1>No photos available!</p></div><md-grid-list md-cols-xs=1 md-cols-sm=2 md-cols-md=4 md-cols-gt-md=6 md-row-height-gt-md=1:1 md-row-height=2:2 md-gutter=12px md-gutter-gt-sm=8px><md-grid-tile class=darkBlue ng-repeat=\"webcamPhoto in stationCamsAndPhotosPhotosCtrlVm.webcamPhotos\" ng-click=\"stationCamsAndPhotosPhotosCtrlVm.showPhoto($event, $index)\"><img data-ng-src=\"data:image/png;base64, {{ webcamPhoto.photo }}\" alt=\"{{ webcamPhoto.timestamp }}\" layout-fill><md-grid-tile-footer><h3>{{ webcamPhoto.timestamp | date: \'yyyy-MM-dd HH:mm:ss Z\' }}</h3></md-grid-tile-footer></md-grid-tile></md-grid-list></div></md-card-content></md-divider></md-card></md-content>");
$templateCache.put("app/station/station-cams-and-photos-videos.html","<md-content class=md-padding><div layout=column><md-virtual-repeat-container id=vertical-container><div layout=column><div ng-show=stationCamsAndPhotosVideosCtrlVm.videos.noVideos()><p class=md-body-1>No videos available!</p></div><div md-virtual-repeat=\"videoUrl in stationCamsAndPhotosVideosCtrlVm.videos\" md-on-demand><div><iframe width=100% height=350 ng-src=\"{{ videoUrl.video_url | trustAsResourceUrl }}\" frameborder=0 allowfullscreen></iframe></div></div></div></md-virtual-repeat-container></div></md-content>");
$templateCache.put("app/station/station-cams-and-photos.html","<md-tabs md-border-bottom md-stretch-tabs=always><md-tab ui-sref=.livewebcams>Live</md-tab><md-tab ui-sref=.photos>Photos</md-tab><md-tab ui-sref=.videos>Videos</md-tab></md-tabs><ui-view></ui-view>");
$templateCache.put("app/station/station-data-group.directive.html","<md-card><md-toolbar><div class=md-toolbar-tools><md-button class=md-icon-button aria-label=\"Group icon\" ng-disabled=true><ng-md-icon class=md-avatar icon=multiline_chart size=24></ng-md-icon></md-button><h2 flex md-truncate>{{ stationDataGroupItemVm.group.group_name }}</h2></div></md-toolbar><div layout=row layout-xs=column><md-button ng-class=\"{\'md-raised md-primary\': stationDataGroupItemVm.viewChart}\" ng-click=stationDataGroupItemVm.changeDataView()><md-icon><ng-md-icon class=md-icon icon=insert_chart size=24></ng-md-icon></md-icon>Chart</md-button><md-button ng-class=\"{\'md-raised md-primary\': stationDataGroupItemVm.viewTable}\" ng-click=stationDataGroupItemVm.changeDataView()><md-icon><ng-md-icon class=md-icon icon=view_list size=24></ng-md-icon></md-icon>Table</md-button><span flex></span><md-input-container><label>QC Level(s)</label><md-select ng-model=stationDataGroupItemVm.group.qc_levels.selected multiple class=md-no-underline md-on-close=stationDataGroupItemVm.qcLevelChange()><md-optgroup label=\"QC Levels (Highest - Lowest)\"><md-option ng-repeat=\"qclevel in stationDataGroupItemVm.group.qc_levels.list\" value=\"{{ qclevel.qc_level }}\">{{ qclevel.qc_level }}</md-option></md-optgroup></md-select></md-input-container><md-input-container><label>Frequency</label><md-select ng-model=stationDataGroupItemVm.group.frequencies.selected class=md-no-underline ng-change=stationDataGroupItemVm.frequencyChange()><md-optgroup label=Frequencies><md-option value=Dynamic>Dynamic</md-option><md-divider><md-option ng-repeat=\"frequency in stationDataGroupItemVm.group.frequencies.list\" value=\"{{ frequency }}\">{{ frequency }}</md-option></md-divider></md-optgroup></md-select></md-input-container></div><md-divider><img class=md-card-image><div ng-show=stationDataGroupItemVm.viewChart id=\"chart-{{ stationDataGroupItemVm.group.group_id }}\" style=\"height: 500px\"></div><div ng-show=!stationDataGroupItemVm.viewChart><md-card ng-repeat=\"qcTable in stationDataGroupItemVm.tableOptionsAll\"><md-toolbar ng-if=qcTable.isReady class=\"md-table-toolbar md-default\"><div class=md-toolbar-tools><span>{{ qcTable.name }}</span> <span flex></span><md-button class=md-icon-button ng-csv=stationDataGroupItemVm.prepareCSVExport($index) csv-header=stationDataGroupItemVm.getHeader($index) aria-label=\"Export and download selected data set as CSV\" filename=\"{{ stationDataGroupItemVm.station.name }} {{ qcTable.name }}.csv\" lazy-load=true><ng-md-icon icon=file_download style=\"fill: #000000\"></ng-md-icon></md-button></div></md-toolbar><md-table-container ng-if=qcTable.isReady><table md-table><thead ng-if=!qcTable.options.decapitate md-head><tr md-row><th md-column><span>{{ qcTable.query.label }}</span></th><th md-column md-numeric><span>QC Level</span></th><th md-column md-numeric ng-repeat=\"qcLevelParameter in qcTable.header\"><span>{{ qcLevelParameter.header }}</span></th></tr></thead><tbody md-body><tr md-row ng-repeat=\"measurement in qcTable.data | filter: filter.search | limitTo: qcTable.query.limit : (qcTable.query.page -1) * qcTable.query.limit\" md-select=measurement md-auto-select=qcTable.options.autoSelect><td md-cell>{{ measurement[qcTable.query.order] | date: qcTable.query.dateFormat }}</td><td md-cell>{{ measurement.qc_level }}</td><td md-cell ng-repeat=\"qcLevelParameter in qcTable.header\">{{ measurement.data[qcLevelParameter.parameterId][qcLevelParameter.valueType] | number: 2 }}</td></tr></tbody></table></md-table-container><md-table-pagination md-limit=qcTable.query.limit md-limit-options=\"[5, 10, 15]\" md-page=qcTable.query.page md-total=\"{{ qcTable.count }}\" md-page-select=qcTable.options.pageSelect></md-table-pagination></md-card></div><md-divider><md-card-title><md-card-title-text><span class=md-headline>{{ stationDataGroupItemVm.group.group_name }}</span></md-card-title-text></md-card-title><md-card-content><p>{{ stationDataGroupItemVm.group.group_description.long_description }}</p></md-card-content></md-divider></md-divider></md-card>");
$templateCache.put("app/station/station-data-groups.html","<md-content class=md-padding><div ng-repeat=\"group in stationDataGroupsVm.groupList\"><station-data-group station=stationDataGroupsVm.station group=stationDataGroupsVm.groups[group.group_id]></station-data-group><br></div></md-content>");
$templateCache.put("app/station/station-data-parameter.directive.html","<md-card><md-toolbar><div class=md-toolbar-tools><md-button class=md-icon-button aria-label=\"Parameter icon\" ng-disabled=true><ng-md-icon class=md-avatar icon=show_chart size=24></ng-md-icon></md-button><h2 flex md-truncate>{{ stationDataParameterItemVm.parameter.parameter_name }}</h2></div></md-toolbar><div layout=row layout-xs=column><md-button ng-class=\"{\'md-raised md-primary\': stationDataParameterItemVm.viewChart}\" ng-click=stationDataParameterItemVm.changeDataView()><md-icon><ng-md-icon class=md-icon icon=insert_chart size=24></ng-md-icon></md-icon>Chart</md-button><md-button ng-class=\"{\'md-raised md-primary\': stationDataParameterItemVm.viewTable}\" ng-click=stationDataParameterItemVm.changeDataView()><md-icon><ng-md-icon class=md-icon icon=view_list size=24></ng-md-icon></md-icon>Table</md-button><span flex></span><md-input-container><label>QC Level(s)</label><md-select ng-model=stationDataParameterItemVm.parameter.qc_levels.selected multiple class=md-no-underline md-on-close=stationDataParameterItemVm.qcLevelChange()><md-optgroup label=\"QC Levels (Highest - Lowest)\"><md-option ng-repeat=\"qclevel in stationDataParameterItemVm.parameter.qc_levels.list\" value=\"{{ qclevel.qc_level }}\">{{ qclevel.qc_level }}</md-option></md-optgroup></md-select></md-input-container><md-input-container><label>Frequency</label><md-select ng-model=stationDataParameterItemVm.parameter.frequencies.selected class=md-no-underline ng-change=stationDataParameterItemVm.frequencyChange()><md-optgroup label=Frequencies><md-option value=Dynamic>Dynamic</md-option><md-divider><md-option ng-repeat=\"frequency in stationDataParameterItemVm.parameter.frequencies.list\" value=\"{{ frequency }}\">{{ frequency }}</md-option></md-divider></md-optgroup></md-select></md-input-container></div><md-divider><img class=md-card-image><div ng-show=stationDataParameterItemVm.viewChart id=\"{{ stationDataParameterItemVm.chartId }}\" style=\"height: 500px\"></div><div ng-show=!stationDataParameterItemVm.viewChart><md-card ng-repeat=\"qcTable in stationDataParameterItemVm.tableOptionsAll\"><md-toolbar ng-if=qcTable.isReady class=\"md-table-toolbar md-default\"><div class=md-toolbar-tools><span>{{ qcTable.name }}</span> <span flex></span><md-button class=md-icon-button ng-csv=stationDataParameterItemVm.prepareCSVExport($index) csv-header=stationDataParameterItemVm.getHeader($index) aria-label=\"Export and download selected data set as CSV\" filename=\"{{ stationDataParameterItemVm.station.name }} {{ qcTable.name }}.csv\" lazy-load=true><ng-md-icon icon=file_download style=\"fill: #000000\"></ng-md-icon></md-button></div></md-toolbar><md-table-container ng-if=qcTable.isReady><table md-table><thead ng-if=!qcTable.options.decapitate md-head><tr md-row><th md-column><span>{{ qcTable.query.label }}</span></th><th md-column md-numeric><span>QC Level</span></th><th ng-if=\"stationDataParameterItemVm.isOfParameterType(\'profile\')\" md-column md-numeric><span>Vertical Position (m)</span></th><th md-column><span>Sensor</span></th><th md-column md-numeric ng-repeat=\"qcLevelParameter in qcTable.header\"><span>{{ qcLevelParameter.header }}</span></th></tr></thead><tbody md-body><tr md-row ng-repeat=\"measurement in qcTable.data | filter: filter.search | limitTo: qcTable.query.limit : (qcTable.query.page -1) * qcTable.query.limit\" md-select=measurement md-auto-select=qcTable.options.autoSelect><td md-cell>{{ measurement[qcTable.query.order] | date: qcTable.query.dateFormat }}</td><td md-cell>{{ measurement.qc_level }}</td><td md-cell ng-if=\"stationDataParameterItemVm.isOfParameterType(\'profile\')\">{{ measurement.vertical_position }}</td><td md-cell>{{ stationDataParameterItemVm.parameter.sensors.sensors[measurement.sensor_id] }}</td><td md-cell ng-repeat=\"qcLevelParameter in qcTable.header\">{{ measurement[qcLevelParameter.valueType] | number: 2 }}</td></tr></tbody></table></md-table-container><md-table-pagination md-limit=qcTable.query.limit md-limit-options=\"[5, 10, 15]\" md-page=qcTable.query.page md-total=\"{{ qcTable.count }}\" md-page-select=qcTable.options.pageSelect></md-table-pagination></md-card></div><md-divider><md-card-title><md-card-title-text><span class=md-headline>{{ stationDataParameterItemVm.parameter.parameter_name }}</span></md-card-title-text></md-card-title><md-card-content><p>{{ stationDataParameterItemVm.parameter.parameter_description.long_description }}</p></md-card-content></md-divider></md-divider></md-card>");
$templateCache.put("app/station/station-data-parameters.html","<md-content class=md-padding><div ng-repeat=\"parameter in stationDataParametersVm.parameterList\"><station-data-parameter station=stationDataParametersVm.station parameter=parameter></station-data-parameter><br></div></md-content>");
$templateCache.put("app/station/station-data.html","<md-tabs md-border-bottom md-stretch-tabs=always><md-tab ui-sref=.parameters>By Parameter</md-tab><md-tab ui-sref=.groups>By Group</md-tab></md-tabs><ui-view></ui-view>");
$templateCache.put("app/station/station-overview-download-info.dialog.html","<md-dialog aria-label=\"Download station info\"><form ng-cloak><md-toolbar class=md-hue-2><div class=md-toolbar-tools><h2>Download Station Info</h2><span flex></span><md-button class=md-icon-button ng-click=StationDownloadInfoDialogControllerVm.cancel()><ng-md-icon icon=close style=\"fill: #ffffff\" aria-label=\"Close dialog\"></ng-md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><div flex=100 layout=column><div layout=row layout-wrap flex><div flex-xs flex=50><md-checkbox aria-label=\"Select All\" ng-checked=StationDownloadInfoDialogControllerVm.isChecked() md-indeterminate=StationDownloadInfoDialogControllerVm.isIndeterminate() ng-click=StationDownloadInfoDialogControllerVm.toggleAll()><span ng-if=StationDownloadInfoDialogControllerVm.isChecked()>Un-</span>Select All</md-checkbox></div><div class=demo-select-all-checkboxes flex=100 ng-repeat=\"(infoField, infoFieldObj) in StationDownloadInfoDialogControllerVm.selectedInfoFields\"><md-checkbox ng-checked=infoFieldObj.selected ng-model=infoFieldObj.selected>{{ infoField }}</md-checkbox></div></div></div></div></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button ng-csv=StationDownloadInfoDialogControllerVm.prepareCSVExport() csv-header=StationDownloadInfoDialogControllerVm.getHeader() aria-label=\"Export and download station info as CSV\" filename=\"{{ StationDownloadInfoDialogControllerVm.station.name }} Info.csv\" lazy-load=true>Download</md-button><md-button ng-click=StationDownloadInfoDialogControllerVm.cancel()>Cancel</md-button></md-dialog-actions></form></md-dialog>");
$templateCache.put("app/station/station-overview-sensor-info.dialog.html","<md-dialog aria-label=\"Sensor info\"><form ng-cloak><md-toolbar class=md-hue-2><div class=md-toolbar-tools><h2>{{ StationSensorInfoDialogControllerVm.sensor.sensor_name }}</h2><span flex></span><md-button class=md-icon-button ng-click=StationSensorInfoDialogControllerVm.cancel()><ng-md-icon icon=close style=\"fill: #ffffff\" aria-label=\"Close dialog\"></ng-md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><div layout=row layout-xs=column><div flex-xs flex-gt-xs=80 layout=column><div layout=row layout-xs=column layout-align-gt-xs=\"space-between center\"><p class=md-body-2>Sensor Name:</p><p class=md-body-2>{{ StationSensorInfoDialogControllerVm.sensor.sensor_name }}</p></div><div layout=row layout-xs=column layout-align-gt-xs=\"space-between center\"><p class=md-body-2>Sensor ID:</p><p class=md-body-2>{{ StationSensorInfoDialogControllerVm.sensor.sensor_id }}</p></div><h4 class=title>Sensor Description</h4><p class=md-body-2>{{ StationSensorInfoDialogControllerVm.sensor.sensor_description.long_description }}</p></div><div flex-xs flex-gt-xs=20 layout=column><img class=md-padding style=\"height: 152px; width: 152px;\" data-ng-src=\"data:image/png;base64, {{ StationSensorInfoDialogControllerVm.sensor.sensor_image }}\" fallback-src=\"https://via.placeholder.com/152x152?text=No%20image\" alt=\"{{ StationSensorInfoDialogControllerVm.sensor.sensor_name }}\"></div></div></div><div><md-toolbar layout=row class=md-hue-1><div class=md-toolbar-tools><span>Data Collected By Sensor</span></div></md-toolbar><md-list flex><md-subheader class=md-no-sticky>Groups</md-subheader><md-list-item class=md-2-line ng-repeat=\"group in StationSensorInfoDialogControllerVm.sensorGroups\" ng-click=null><ng-md-icon class=md-avatar icon=multiline_chart size=40></ng-md-icon><div class=md-list-item-text layout=column><h3>{{ group.group_name }}</h3><p>{{ group.group_description.short_description }}</p></div></md-list-item><md-divider></md-divider><md-subheader class=md-no-sticky>Parameters</md-subheader><md-list-item class=md-2-line ng-repeat=\"parameter in StationSensorInfoDialogControllerVm.sensorParameters\" ng-click=null><ng-md-icon class=md-avatar icon=show_chart size=40></ng-md-icon><div class=md-list-item-text layout=column><h3>{{ parameter.parameter_name }}</h3><p>{{ parameter.parameter_description.short_description }}</p></div></md-list-item></md-list></div></md-dialog-content><md-dialog-actions layout=row></md-dialog-actions></form></md-dialog>");
$templateCache.put("app/station/station-overview.html","<md-content class=md-padding layout=column><div layout=row layout-xs=column><div flex-xs flex-gt-xs=50 layout=column><md-card><img data-ng-src=\"data:image/png;base64, {{ stationOverviewVm.station.image }}\" class=md-card-image alt=\"{{ stationOverviewVm.station.image }}\"></md-card><md-card><md-toolbar class=md-hue-2><div class=md-toolbar-tools><span>Station Info</span> <span flex></span><md-button class=md-icon-button aria-label=\"Export and station information as CSV\" ng-click=stationOverviewVm.showDownloadInfoDialog($event)><md-tooltip md-direction=left>Download Station Info</md-tooltip><ng-md-icon icon=file_download style=\"fill: #ffffff\"></ng-md-icon></md-button></div></md-toolbar><md-card-content><div layout=row layout-xs=column layout-align=\"space-between center\"><p class=md-body-2>Environment Category:</p><p class=md-body-2>{{ stationOverviewVm.station.environment_category }}</p></div><div layout=row layout-xs=column layout-align=\"space-between center\"><p class=md-body-2>Position (WGS84):</p><p class=md-body-2>{{ stationOverviewVm.station.position.latitude }}, {{ stationOverviewVm.station.position.longitude }}</p></div><h4 class=title>Description</h4><p class=md-body-2>{{ stationOverviewVm.station.description.long_description }}</p></md-card-content></md-card></div><div flex-xs flex-gt-xs=50 layout=column><md-card><img class=md-card-image><div class=google-map><ui-gmap-google-map ng-if=stationOverviewVm.map.showMap center=stationOverviewVm.map.center options=stationOverviewVm.mapOptions zoom=stationOverviewVm.map.zoom idkey=station-google-map><ui-gmap-marker idkey=stationOverviewVm.mapMarker.key coords=stationOverviewVm.mapMarker.coords options=stationOverviewVm.mapMarker.options></ui-gmap-marker></ui-gmap-google-map></div></md-card></div></div><div layout=row layout-xs=column><div flex-xs flex-gt-xs=50 layout=column><md-card><md-toolbar class=md-hue-2><div class=md-toolbar-tools><h3><span>Sensors</span></h3></div></md-toolbar><md-card-content><md-list flex><md-list-item class=\"md-2-line md-long-text\" ng-repeat=\"sensor in stationOverviewVm.sensors\" ng-click=\"stationOverviewVm.showSensorInfoDialog($event, sensor)\"><img ng-if=stationOverviewVm.isImage(sensor.sensor_image) data-ng-src=\"data:image/png;base64, {{ sensor.sensor_image }}\" class=md-avatar alt=\"{{ sensor.sensor_name }}\"><ng-md-icon ng-if=!stationOverviewVm.isImage(sensor.sensor_image) class=md-avatar icon=developer_dashboard size=40></ng-md-icon><div class=md-list-item-text layout=column><h3>{{ sensor.sensor_name }}</h3><p>{{ sensor.sensor_description.short_description }}</p></div><md-button class=md-secondary hide show-gt-xs ng-click=\"stationOverviewVm.showSensorInfoDialog($event, sensor)\">More Info</md-button></md-list-item></md-list></md-card-content></md-card></div><div flex-xs flex-gt-xs=50 layout=column><md-card><md-toolbar class=md-hue-2><div class=md-toolbar-tools><h3><span>Data Collection</span></h3></div></md-toolbar><md-card-content><md-list flex><md-subheader class=md-no-sticky>Groups</md-subheader><md-list-item class=md-2-line ng-repeat=\"group in stationOverviewVm.groups\" ng-click=null><ng-md-icon class=md-avatar icon=multiline_chart size=40></ng-md-icon><div class=md-list-item-text layout=column><h3>{{ group.group_name }}</h3><p>{{ group.group_description.short_description }}.</p></div></md-list-item><md-divider></md-divider><md-subheader class=md-no-sticky>Parameters</md-subheader><md-list-item class=md-2-line ng-repeat=\"parameter in stationOverviewVm.parameters\" ng-click=null><ng-md-icon class=md-avatar icon=show_chart size=40></ng-md-icon><div class=md-list-item-text layout=column><h3>{{ parameter.parameter_name }}</h3><p>{{ parameter.parameter_description.short_description }}</p></div></md-list-item></md-list></md-card-content></md-card></div></div></md-content>");
$templateCache.put("app/station/station.html","<md-toolbar><div class=md-toolbar-tools><h3 md-truncate>{{ stationVm.station.name }}</h3><span flex></span></div><md-tabs class=nav-tabs-station md-stretch-tabs=always md-dynamic-height=false><md-tab ui-sref=.overview><md-tab-label><ng-md-icon class=md-icon icon=info_outline size=24></ng-md-icon><div show-gt-sm>Overview</div></md-tab-label></md-tab><md-tab ui-sref=.data.parameters><md-table-label><ng-md-icon class=md-icon icon=show_chart size=24></ng-md-icon><div show-gt-sm>Data</div></md-table-label></md-tab><md-tab ui-sref=.cams-and-photos.livewebcams><md-tab-label><ng-md-icon class=md-icon icon=photo_camera size=24></ng-md-icon><div show-gt-sm>Cams & Photos</div></md-tab-label></md-tab></md-tabs></md-toolbar><md-content flex md-scroll-y><div flex layout=column layout-fill><ui-view></ui-view></div></md-content>");}]);