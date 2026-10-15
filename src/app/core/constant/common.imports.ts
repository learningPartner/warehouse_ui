import { AsyncPipe, NgClass } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

export const CommonImports= {
    FORM_IMPORTS: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        AsyncPipe,
        RouterLink
    ]
}