#!/usr/bin/env bash

set -euox pipefail

function new_release {
    project=$1
    file=$2
    version=$3

    sed -e '/'"$project"'/,+2d' -i $file
    echo '- name: '"$project"'
  repository: http://jenkins-x-chartmuseum:8080
  version: '"$version" >> $file
    cat $file
}

function clone_repo {
    project_name=$1
    export GITHUB_URL=$(echo $GIT_URL | awk -F '/' '{ print $1"//"$3"/"$4 }')

    git clone "${GITHUB_URL}/${project_name}"
}

function get_app_version {
    project=$1
    environment=$2
    #TODO: Alter below to take into account no spring actuator
    curl "${project}.${environment}.cp.fbp/actuator/info" | jq -r '.version' || echo "0.0.0"
}

function push_changes {
    project=$1
    expected_version=$2
    environment_project_name=$3
    environment=$4
#     current_version=$(get_app_version $project $environment || true)

#     retries=1
#     max_retries=60
#     seconds_between_retries=30

    git add .
    git commit -m "New Deployment on $environment for $project: version $expected_version"
    git push origin main

#     while [[ $current_version != ${expected_version} ]] ;
#     do
#         echo "[ATTEMPT $retries] Waiting for $project to be version $expected_version"
#         current_version=$(get_app_version $project $environment || true)

#         if [[ "$retries" -gt "$max_retries" ]] ;
#         then
#             echo "Maximum number of retries($max_retries) reached"
#             rm -rf $PROJECT_LOCAL_FOLDER/$environment_project_name
#             exit 1
#         fi
#         retries=$((retries+1))

#         sleep $seconds_between_retries
#     done
}

PROJECT=$1
VERSION=$2
ENVIRONMENT=$3

CURRENT_FOLDER=$(pwd)
export PROJECT_LOCAL_FOLDER=/tmp

cd $PROJECT_LOCAL_FOLDER

ENVIRONMENT_PROJECT_NAME="environment-kubernetes-${ENVIRONMENT}"

clone_repo "${ENVIRONMENT_PROJECT_NAME}"

cd $ENVIRONMENT_PROJECT_NAME

new_release $PROJECT ./env/requirements.yaml $VERSION

push_changes $PROJECT $VERSION $ENVIRONMENT_PROJECT_NAME $ENVIRONMENT

cd ..

rm -rf $ENVIRONMENT_PROJECT_NAME

cd $CURRENT_FOLDER

echo "Project '$PROJECT' deployment to version '$VERSION' completed!"
