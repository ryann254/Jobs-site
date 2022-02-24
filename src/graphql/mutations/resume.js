import gql from "graphql-tag";
import { resumeFragment } from "graphql/fragments";
import {
  simpleResumeFragment,
  awardItemFragment,
  educationItemFragment,
  workItemFragment,
} from "graphql/fragments";

export const DUPLICATE_RESUME = gql`
  ${simpleResumeFragment}
  mutation DuplicateResume($id: ID!) {
    duplicateResume(resumeId: $id) {
      __typename
      success
      resume {
        ...Resume
      }
      errors {
        field
        message
      }
    }
  }
`;

export const DELETE_RESUME = gql`
  mutation ResumeDelete($id: ID!) {
    resumeDelete(id: $id) {
      __typename
      success
      found
      errors {
        field
        message
      }
      deletedRawId
      deletedId
    }
  }
`;

export const RESUME_MUTATION = gql`
  ${simpleResumeFragment}
  mutation ResumeCreate($name: String!, $preview: String) {
    resumeCreate(input: { name: $name, preview: $preview }) {
      __typename
      success
      errors {
        field
        message
      }
      resume {
        ...Resume
      }
    }
  }
`;

export const RESUME_UPDATE_MUTATION = gql`
  ${simpleResumeFragment}
  mutation ResumeUpdate($id: ID!, $name: String!) {
    resumePatch(id: $id, input: { name: $name }) {
      __typename
      success
      errors {
        field
        message
      }
      resume {
        ...Resume
      }
    }
  }
`;

export const UPDATE_RESUME = gql`
  ${resumeFragment}
  mutation ResumePatch(
    $id: ID!
    $public: Boolean
    $isActive: Boolean
    $name: String
    $objective: PatchResumeInputCreateObjective
    $education: PatchResumeInputCreateEducation
    $skill: PatchResumeInputCreateSkill
    $hobby: PatchResumeInputCreateHobby
    $work: PatchResumeInputCreateWork
    $award: PatchResumeInputCreateAward
    $certification: PatchResumeInputCreateCertification
    $language: PatchResumeInputCreateLanguage
    $resumemetadata: PatchResumeInputCreateResumemetadata
    $project: PatchResumeInputCreateProject
    $reference: PatchResumeInputCreateReference
    $social: PatchResumeInputCreateSocial
  ) {
    resumePatch(
      id: $id
      input: {
        name: $name
        isActive: $isActive
        public: $public
        objective: $objective
        education: $education
        skill: $skill
        hobby: $hobby
        work: $work
        award: $award
        certification: $certification
        language: $language
        resumemetadata: $resumemetadata
        project: $project
        reference: $reference
        social: $social
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      resume {
        ...Resume
      }
    }
  }
`;

export const AWARD_MUTATION = gql`
  ${awardItemFragment}
  mutation AwardItemCreate(
    $organization: String
    $title: String
    $date: Date
    $award_pk: String
    $descriptionPlaintext: String
  ) {
    awardItemCreate(
      input: {
        award: $award
        organization: $organization
        title: $title
        date: $date
        award_pk: $award_pk
        descriptionPlaintext: $descriptionPlaintext
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      awardItem {
        ...AwardItem
      }
    }
  }
`;

export const AWARD_UPDATE_MUTATION = gql`
  ${awardItemFragment}
  mutation AwardItemUpdate(
    $id: ID!
    $organization: String
    $title: String
    $date: Date
  ) {
    awardItemPatch(
      id: $id
      input: {
        award: $award
        organization: $organization
        title: $title
        date: $date
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      awardItem {
        ...AwardItem
      }
    }
  }
`;

export const WORK_ITEM_CREATE = gql`
  ${workItemFragment}
  mutation WorkItemCreate(
    $descriptionPlaintext: String
    $owner: ID
    $company: String
    $position: String
    $workStart: Date
    $workEnd: Date
    $achievements: String
    $website: String
  ) {
    workItemCreate(
      input: {
        descriptionPlaintext: $descriptionPlaintext
        owner: $owner
        company: $company
        position: $position
        workStart: $workStart
        workEnd: $workEnd
        achievements: $achievements
        website: $website
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      workItem {
        ...WorkItem
      }
    }
  }
`;

export const WORK_ITEM_UPDATE = gql`
  ${workItemFragment}
  mutation WorkItemUpdate(
    $descriptionPlaintext: String
    $company: String
    $position: String
    $workStart: Date
    $workEnd: Date
    $achievements: String
    $website: String
  ) {
    workItemPatch(
      input: {
        descriptionPlaintext: $descriptionPlaintext
        company: $company
        position: $position
        workStart: $workStart
        workEnd: $workEnd
        achievements: $achievements
        website: $website
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      workItem {
        ...WorkItem
      }
    }
  }
`;

export const EDUCATION_ITEM_CREATE = gql`
  ${educationItemFragment}
  mutation WorkItemCreate(
    $descriptionPlaintext: String
    $owner: ID
    $institution: String
    $fieldOfStudy: String
    $degree: String
    $gpa: String
    $schoolStart: Date!
    $schoolEnd: Date!
  ) {
    educationItemCreate(
      input: {
        descriptionPlaintext: $descriptionPlaintext
        owner: $owner
        institution: $institution
        fieldOfStudy: $fieldOfStudy
        degree: $degree
        gpa: $gpa
        schoolStart: $schoolStart
        schoolEnd: $schoolEnd
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      educationItem {
        ...WorkItem
      }
    }
  }
`;

export const EDUCATION_ITEM_UPDATE = gql`
  ${educationItemFragment}
  mutation EducationItemUpdate(
    $descriptionPlaintext: String
    $institution: String
    $fieldOfStudy: String
    $degree: String
    $gpa: String
    $schoolStart: Date!
    $schoolEnd: Date!
  ) {
    educationItemPatch(
      input: {
        descriptionPlaintext: $descriptionPlaintext
        institution: $institution
        fieldOfStudy: $fieldOfStudy
        degree: $degree
        gpa: $gpa
        schoolStart: $schoolStart
        schoolEnd: $schoolEnd
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      educationItem {
        ...WorkItem
      }
    }
  }
`;
