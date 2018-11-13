import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '@knora/core';
import { CacheService } from '../main/cache/cache.service';
import { MenuItem } from '../main/declarations/menu-item';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


    loading: boolean;

    projectcode: string;

    // for the sidenav
    open: boolean = true;

    navigation: MenuItem[] = [
        {
            label: 'Project',
            route: 'board',
            icon: 'dashboard'
        },
        {
            label: 'Collaboration',
            route: 'collaboration',
            icon: 'group'
        },
        {
            label: 'Ontologies',
            route: 'ontologies',
            icon: 'timeline',
            children: [
                {
                    label: '',
                    route: '',
                    icon: 'dash',
                }
            ]
        }
    ];


    constructor(private _cache: CacheService,
                private _route: ActivatedRoute,
                private _projectsService: ProjectsService) {

        // get the shortcode of the current project
        this.projectcode = this._route.snapshot.params.shortcode;

        console.log(this._route.snapshot.params);

    }

    ngOnInit() {

        this.loading = true;
        // set the cache here:
        // current project data
        this._cache.get(this.projectcode, this._projectsService.getProjectByShortcode(this.projectcode));
        this.loading = false;

    }

}
